angular
  .module('app')
  .factory('noYesApi', noYesApi);

function noYesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/noyeses"
    
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