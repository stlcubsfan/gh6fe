angular
  .module('app')
  .factory('clientHealthApi', clientHealthApi);

function clientHealthApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/clients/";
    return {
        all: all,
        one: one,
        save: save,
        update: update
    }

    function all(clientId) {
        return $http.get(baseApi + clientId + '/healthes');
    }

    function one(clientId, id) {
        return $http.get(baseApi + clientId, + '/healthes/' + id);
    }

    function save(health) {
        return $http.post(baseApi + clientId + '/healthes', health);
    }

    function update(health) {
        return $http.put(baseApi + clientId + '/healthes/' + health.id, health);
    }
}