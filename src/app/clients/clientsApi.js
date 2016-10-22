angular
  .module('app')
  .factory('clientsApi', clientsApi);

function clientsApi($http) {
    var baseApi = 'http://gh6api.herokuapp.com/clients';

    return {
        all: getClients,
        one: getClient
    }

    function getClients() {
        return $http.get(baseApi);
    }

    function getClient(id) {
        return $http.get(baseApi + '/' + id);
    }
}