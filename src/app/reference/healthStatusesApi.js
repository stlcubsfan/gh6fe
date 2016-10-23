angular
  .module('app')
  .factory('healthStatusesApi', healthStatusesApi);

function healthStatusesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/healthstatuses"
    
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