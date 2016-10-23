angular
  .module('app')
  .factory('educationLevelsApi', educationLevelsApi);

function educationLevelsApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/educationlevels"
    
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