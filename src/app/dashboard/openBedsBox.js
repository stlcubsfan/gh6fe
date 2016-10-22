angular
  .module('app')
  .component('openBedsBox', {
    templateUrl: 'app/dashboard/openBedsBox.html',
    controller: openBedsCtrl,
    controllerAs: 'openBeds'
  });

function openBedsCtrl($stateParams, agenciesApi, nearMeMiles) {
  const vm = this;

  init();

  function init() {
    agenciesApi.getAgencies().then(agencies => {
      vm.totalBeds = mapReduceBedsAvailable(agencies.data);
    });
    navigator.geolocation.getCurrentPosition(pos => {
      const params = {
        ypos: pos.coords.latitude,
        xpos: pos.coords.longitude,
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
