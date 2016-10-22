angular
  .module('app')
  .component('programDetail', {
    templateUrl: 'app/programs/programDetail.html',
    controller: makeProgramDetail,
    controllerAs: 'ProgramDetail'
  });

function makeProgramDetail(programsApi, $stateParams) {
    const vm = this;

    init();

    function init() {
      programsApi.getProgram($stateParams.programId).then(function (response) {
        vm.program = response.data;
      });
    }
}
