angular
  .module('app')
  .component('agencyHealth', {
    templateUrl: 'app/agency/agencyHealth.html',
    controller: makeagencyHealth,
    controllerAs: 'AgencyHealth'
  });

function makeagencyHealth() {
    const vm = this;

    init();

    function init() {

    }
}
