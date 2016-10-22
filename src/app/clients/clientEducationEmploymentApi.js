angular
  .module('app')
  .factory('clientEducationEmploymentsApi', clientEducationEmploymentsApi);

function clientEducationEmploymentsApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/clients/";
    return {
        all: all,
        one: one,
        save: save,
        update: update
    }

    function all(clientId) {
        return $http.get(baseApi + clientId + '/educationAndEmployments');
    }

    function one(clientId, id) {
        return $http.get(baseApi + clientId, + '/educationAndEmployments/' + id);
    }

    function save(educationEmployment) {
        return $http.post(baseApi + clientId + '/educationAndEmployments', educationEmployment);
    }

    function update(educationEmployment) {
        return $http.put(baseApi + clientId + '/educationAndEmployments/' + educationEmployment.id, educationEmployment);
    }
}