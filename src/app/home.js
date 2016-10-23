angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller: makeHome,
    controllerAs: 'Dashboard'
  });

function makeHome(chartDemo, agencyApi, $scope) {
    const vm = this;

    init();

    $scope.$on('agency-updated', onAgencyUpdated);

    function init(shouldBustCache) {
      vm.isLoading = true;
      vm.chartConfig = chartDemo;

      agencyApi.getCurrent(shouldBustCache).then(agency => {
        vm.currentAgency = agency;
        vm.isLoading = false;
      });
    }

    function onAgencyUpdated(event, args) {
      init('bust-cache');
    }
}
