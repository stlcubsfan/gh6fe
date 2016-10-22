angular
  .module('app')
  .component('openBedsBox', {
    templateUrl: 'app/dashboard/openBedsBox.html',
    controller: openBedsCtrl,
    controllerAs: 'openBeds'
  });

function openBedsCtrl($stateParams, agencyApi, nearMeMiles, $http, gMapsApiKey) {
  const vm = this;

  init();

  function init() {
    vm.totalBedsNearMe = null;

    agencyApi.all().then(agencies => {
      vm.agencies = agencies.data;
      vm.totalBeds = mapReduceBedsAvailable(vm.agencies);
      agencyApi.getCurrent().then(agency => {
        vm.currentAgency = agency;

        const params = {
          xpos: vm.currentAgency.pos.x,
          ypos: vm.currentAgency.pos.y,
          range: nearMeMiles
        };

        agencyApi.getAgenciesNearMe(params).then(agencies => {
          vm.totalBedsNearMe = mapReduceBedsAvailable(agencies.data);
        });
      });
    });
  }

  function mapReduceBedsAvailable(agencies) {
    const result = agencies.map(agency => {
      return agency.total_beds_available ? parseInt(agency.total_beds_available) : 0;
    }).reduce( (prev, curr) => {
      return prev + curr;
    }, 0);
    console.log(result);
    return result;
  }
}
