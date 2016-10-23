angular
  .module('app')
  .controller('sidebar', makeSidebar);

function makeSidebar(agencyApi, $rootScope) {
    const vm = this;

    vm.setCurrenctAgency = setCurrenctAgency;

    init();

    function init() {
      agencyApi.all().then(function (response) {
        vm.allAgencies = response.data;
        vm.stPat = vm.allAgencies.find(agency => {
          return agency.id === 1;
        });
        vm.stPatLogoUrl = vm.stPat.image_url;

        agencyApi.getCurrent().then(function (response) {
          vm.currentAgency = response;
          vm.currentAgency.image_url = vm.currentAgency.image_url || vm.stPatLogoUrl;
        });
      });

    }

    function setCurrenctAgency(agency) {
      agencyApi.setCurrent(agency.id);
      vm.currentAgency = agency;
      vm.currentAgency.image_url = vm.currentAgency.image_url || vm.stPatLogoUrl;
      $rootScope.$broadcast('agency-updated', {newAgency: agency});
    }
}
