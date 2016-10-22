angular
  .module('app')
  .factory('employmentTypesApi', employmentTypesApi);

function employmentTypesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/employmenttypes"
    
    return {
        all: all,
        one: one
    }

    function all() {
        return $http.get(baseApi, { cache: true});
    }

    function one(id) {
        return $http.get(baseApi + '/' + id, { cache: true});
    }
}