angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller: makeHome,
    controllerAs: 'Dashboard'
  });

function makeHome(chartDemo) {
    const vm = this;

    vm.chartConfig = chartDemo;
}
