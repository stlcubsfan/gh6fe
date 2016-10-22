angular
  .module('app')
  .factory('disabilitiesApi', disabilitiesApi);

function disabilitiesApi($http, $q) {
    var baseApi = "http://gh6api.herokuapp.com/disabilities"
    var disabilities = [];
    return {
        all: getDisabilities,
        one: getDisability
    }

    function getDisabilities() {
        if (disabilities.length > 0) {
            return $q.resolve(disabilities);
        } else {
            return $http.get(baseApi);
        }
        
    }

    function getDisability(id) {
        return $http.get(baseApi + '/' + id);
    }
}