angular
  .module('app')
  .component('agencyHealth', {
    templateUrl: 'app/agency/agencyHealth.html',
    controller: makeagencyHealth,
    controllerAs: 'AgencyHealth'
  });

function makeagencyHealth(agencyApi) {
    const vm = this;

    init();

    function init() {
      agencyApi.getKeyIndicators().then(kis => {
        vm.keyIndicators = kis.data;
      });
    }
}
