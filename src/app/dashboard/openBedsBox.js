angular
  .module('app')
  .component('openBedsBox', {
    templateUrl: 'app/dashboard/openBedsBox.html',
    controller: openBedsCtrl,
    controllerAs: 'openBeds',
    require: {
      dashboardCtrl: '^home'
    }
  });

function openBedsCtrl($stateParams, $scope, agencyApi, nearMeMiles) {
  const vm = this;

  $scope.$on('checkin-made', onCheckinMade);

  vm.$onInit = () => {
    vm.totalBedsNearMe = null;
    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;
      vm.totalBeds = parseInt(vm.currentAgency.beds_available);

      const params = {
        xpos: vm.currentAgency.pos.x,
        ypos: vm.currentAgency.pos.y,
        range: nearMeMiles
      };

      agencyApi.getAgenciesNearMe(params).then(agencies => {
        vm.totalBedsNearMe = mapReduceBedsAvailable(agencies.data);
      });
    });
  }

  vm.calcProgress = () => {
    if (!vm.currentAgency) {
      return '0%';
    }

    const total = parseInt(vm.currentAgency.total_beds_available);
    const reserved = parseInt(vm.currentAgency.reservation_count);
    return (reserved / total * 100) + '%'
  }

  function mapReduceBedsAvailable(agencies) {
    const result = agencies.map(agency => {
      return agency.beds_available ? parseInt(agency.beds_available) : 0;
    }).reduce( (prev, curr) => {
      return prev + curr;
    }, 0);
    return result;
  }


  function onCheckinMade(event, args) {
    vm.currentAgency.beds_available -= args.bedCount;
    vm.totalBeds = vm.currentAgency.beds_available;
  }
}
