angular
  .module('app')
  .component('openBedsBox', {
    templateUrl: 'app/dashboard/openBedsBox.html',
    controller: openBedsCtrl,
    controllerAs: 'openBeds'
  });

function openBedsCtrl($stateParams, agenciesApi, nearMeMiles, $http, gMapsApiKey) {
  const vm = this;

  init();

  function init() {
    agenciesApi.getAgencies().then(agencies => {
      vm.agencies = agencies.data;
      vm.totalBeds = mapReduceBedsAvailable(vm.agencies);
      vm.currentAgency = vm.agencies.filter( agency => {
        return agency.id === 1;
      });

      const params = {
        xpos: 38.6334014,
        ypos: -90.197793,
        range: nearMeMiles
      };

      console.log(params);
      agenciesApi.getAgenciesNearMe(params).then(agencies => {
        console.log(agencies);
        vm.totalBedsNearMe = mapReduceBedsAvailable(agencies.data);
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
