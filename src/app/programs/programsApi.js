angular
  .module('app')
  .factory('programsApi', makeProgramsApi);

function makeProgramsApi($http, $q, dummyPrograms, dummyProgramCategories, clientsApi, agencyApi) {
    let programsApi = {};
    let baseApi = 'http://gh6api.herokuapp.com/agencies/';
    programsApi.getPrograms = function () {
        return agencyApi.getCurrent().then(agency => {
            return $http.get(baseApi + agency.id + '/programs');
        });
    };

    programsApi.getProgram = function (id) {
        return agencyApi.getCurrent().then(agency => {
            return $http.get(baseApi + agency.id + '/programs/' + id);
        })
    };

    programsApi.getCategories = function (id) {
        return $q.when({
            data: dummyProgramCategories.categories
        });
    };

    programsApi.getClientsForProgram = function (programId) {
        return agencyApi.getCurrent().then(agency => {
            return $http.get(baseApi + agency.id + '/programs/' + programId + '/clients');
        });
    };


    return programsApi;
}
