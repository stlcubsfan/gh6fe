angular
  .module('app')
  .controller('sidebar', makeSidebar);

function makeSidebar(agencyApi) {
    const vm = this;

    vm.setCurrenctAgency = setCurrenctAgency;

    init();

    function init() {

      agencyApi.getCurrent().then(function (response) {
        vm.currentAgency = response;
      });

      agencyApi.all().then(function (response) {
        vm.allAgencies = response.data;
      });
    }

    function setCurrenctAgency(agency) {
      agencyApi.setCurrent(agency.id);
      vm.currentAgency = agency;
    }
}
