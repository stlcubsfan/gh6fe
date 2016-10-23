angular
  .module('app')
  .factory('notEmployedReasonsApi', notEmployedReasonsApi);

function notEmployedReasonsApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/notemployedreasons"
    
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