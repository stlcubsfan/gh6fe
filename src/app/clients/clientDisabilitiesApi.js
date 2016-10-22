angular
  .module('app')
  .factory('clientDisabilitiesApi', clientDisabilitiesApi);

function clientDisabilitiesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/client/";
    return {
        all: getDisabilities,
        one: getDisability,
        save: saveDisability,
        update: updateDisability
    }

    function getDisabilities(clientId) {
        return $http.get(baseApi + '/' + clientId + 'disabilities');
    }

    function getDisability(clientId, id) {
        return $http.get(baseApi + '/' + clientId, + '/disabilities/' + id);
    }

    function saveDisability(disability) {
        return $http.post(baseApi + '/' + clientId + '/disabilities');
    }

    function updateDisability(disability) {
        return $http.put(baseApi + '/' + clientId + '/disabilities/' + disability.clientid);
    }
}