angular
  .module('app')
  .factory('schoolStatusesApi', schoolStatusesApi);

function schoolStatusesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/schoolstatuses"
    
    return {
        all: getSchoolStatuses,
        one: getSchoolStatus
    }

    function getSchoolStatuses() {
        return $http.get(baseApi, { cache: true});
    }

    function getSchoolStatus(id) {
        return $http.get(baseApi + '/' + id, { cache: true});
    }
}