angular
  .module('app')
  .factory('clientsApi', clientsApi);

function clientsApi($http) {
    var baseApi = 'http://gh6api.herokuapp.com/clients';

    return {
        all: getClients,
        one: getClient,
        create: createClient
    }

    function getClients() {
        return $http.get(baseApi);
    }

    function getClient(id) {
        return $http.get(baseApi + '/' + id);
    }

    function createClient(newClient) {
        newClient = cleanClient(newClient);
        return $http.post(baseApi, newClient);
    }

    function cleanClient(client) {
        let cleanClient = _.cloneDeep(client);

        delete cleanClient.bedsNeeded;
        return cleanClient;
    }
}