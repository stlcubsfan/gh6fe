angular
  .module('app')
  .factory('clientDisabilitiesApi', clientDisabilitiesApi);

function clientDisabilitiesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/clients/";
    return {
        all: getDisabilities,
        one: getDisability,
        save: saveDisability,
        update: updateDisability
    }

    function getDisabilities(clientId) {
        return $http.get(baseApi + clientId + '/disabilities');
    }

    function getDisability(clientId, id) {
        return $http.get(baseApi + clientId, + '/disabilities/' + id);
    }

    function saveDisability(disability) {
        return $http.post(baseApi + clientId + '/disabilities', disability);
    }

    function updateDisability(disability) {
        return $http.put(baseApi + clientId + '/disabilities/' + disability.id, disability);
    }
}