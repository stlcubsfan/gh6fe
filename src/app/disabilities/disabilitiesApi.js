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
        return $http.get(baseApi, { cache: true});
    }

    function getDisability(id) {
        return $http.get(baseApi + '/' + id, { cache: true});
    }
}