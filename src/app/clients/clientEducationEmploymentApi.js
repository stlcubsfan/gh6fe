angular
  .module('app')
  .factory('clientEducationEmploymentsApi', clientEducationEmploymentsApi);

function clientEducationEmploymentsApi($http) {
    //var baseApi = "http://gh6api.herokuapp.com/clients/";
    var baseApi = "http://localhost:3002/clients/"
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
        return $http.post(baseApi + educationEmployment.clientid + '/educationAndEmployments', educationEmployment);
    }

    function update(educationEmployment) {
        delete educationEmployment.educationLevel;
        delete educationEmployment.schoolStatus;
        delete educationEmployment.notEmployedReason;
        delete educationEmployment.employmentType;
        return $http.put(baseApi + educationEmployment.clientid + '/educationAndEmployments/' + educationEmployment.id, educationEmployment);
    }
}