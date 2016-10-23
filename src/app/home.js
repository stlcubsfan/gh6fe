angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home.html',
    controller: makeHome,
    controllerAs: 'Dashboard'
  });

function makeHome(chartDemo, agencyApi, $scope, partnersApi) {
    const vm = this;

    init();

    $scope.$on('agency-updated', onAgencyUpdated);

    function init(shouldBustCache) {
      vm.isLoading = true;
      vm.chartConfig = chartDemo;

      agencyApi.getCurrent(shouldBustCache).then(agency => {
        vm.currentAgency = agency;
        vm.opportunityCount = 0;
        vm.spotCount = 0;
        partnersApi.all().then(partners => {
          _.each(partners.data, function (partner) {
            partnersApi.opportunities(partner.id).then(opps => {
              vm.opportunityCount += opps.data.length;
              _.each(opps.data, function (opp) {
                vm.spotCount += Number(opp.spots_open);
              });
            });
          });
        });
        vm.isLoading = false;
      });
    }

    function onAgencyUpdated(event, args) {
      init('bust-cache');
    }
}
