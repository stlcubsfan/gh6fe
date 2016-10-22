angular
  .module('app')
  .factory('programsApi', makeProgramsApi);

function makeProgramsApi($http, $q, dummyPrograms) {
    let programsApi = {};

    programsApi.getPrograms = function () {
        return $q.when({
            data: dummyPrograms.programs
        });
    };

    programsApi.getProgram = function (id) {
        return programsApi.getPrograms().then(function (response) {
            return {
                data: _.find(response.data, {id: parseInt(id)})
            }
        });
    };

    return programsApi;
}
