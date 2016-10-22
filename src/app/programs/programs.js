angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/programs/programs.html',
    controller: makePrograms,
    controllerAs: 'Programs'
  });

function makePrograms(programsApi) {
    const vm = this;

    init();

    function init() {
      programsApi.getPrograms().then(function (response) {
        vm.programs = response.data;
      });
    }
}
