angular
  .module('app')
  .factory('clientsApi', clientsApi);

function clientsApi($http) {
    var baseApi = 'http://gh6api.herokuapp.com/clients';

    return {
        all: getClients,
        one: getClient,
        create: createClient,
        getStatusColorForHousing: getStatusColorForHousing,
        getStatusColorForEmployment: getStatusColorForEmployment
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

    function getStatusColorForHousing(client) {
      if (!client) {
        return;
      }
      let status = client.housing_status || 'Homeless';

      if (!status || status === 'Homeless') {
        return 'red';
      } else if (status === 'Temporary') {
        return 'yellow';
      } else {
        return 'green';
      }
    }

    function getStatusColorForEmployment(client) {
      if (!client) {
        return;
      }

      let status = client.employment_status || 'None';

      if (!status || status === 'None') {
        return 'red';
      } else if (status === 'Part Time' || status === 'Seasonal') {
        return 'yellow';
      } else {
        return 'green';
      }
    }
}
