angular
  .module('app')
  .component('programDetail', {
    templateUrl: 'app/programs/programDetail.html',
    controller: makeProgramDetail,
    controllerAs: 'ProgramDetail'
  });

function makeProgramDetail(programsApi, $stateParams, clientsApi) {
    const vm = this;

    init();

    function init() {
      programsApi.getProgram($stateParams.programId).then(function (response) {
        vm.program = response.data;
      });

      programsApi.getCategories().then(function (response) {
        vm.allCategories = response.data;
      });

      programsApi.getClientsForProgram($stateParams.programId).then(function (response) {
        vm.enrollments = response.data;
        _.each(vm.enrollments, function (enrollment) {
          clientsApi.one(enrollment.client_id).then(r => {
            enrollment.clientData = r.data;
          });
        });
      });
    }
}
