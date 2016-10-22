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

function openBedsCtrl($stateParams, agencyApi, nearMeMiles) {
  const vm = this;

  vm.$onInit = () => {
    vm.totalBedsNearMe = null;
    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;
      vm.totalBeds = vm.currentAgency.beds_available;

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

  function mapReduceBedsAvailable(agencies) {
    const result = agencies.map(agency => {
      return agency.beds_available ? parseInt(agency.beds_available) : 0;
    }).reduce( (prev, curr) => {
      return prev + curr;
    }, 0);
    return result;
  }
}
