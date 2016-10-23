angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller: makeHome,
    controllerAs: 'Dashboard'
  });

function makeHome(chartDemo, agencyApi) {
    const vm = this;

    init()

    function init() {
      vm.chartConfig = chartDemo;

      agencyApi.getCurrent().then(agency => {
        vm.currentAgency = agency;
      });
    }
}
