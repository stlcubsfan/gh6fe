angular
  .module('app')
  .factory('clientIncomesApi', clientIncomesApi);

function clientIncomesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/clients/";
    return {
        all: all,
        one: one,
        save: save,
        update: update
    }

    function all(clientId) {
        return $http.get(baseApi + clientId + '/incomes');
    }

    function one(clientId, id) {
        return $http.get(baseApi + clientId, + '/incomes/' + id);
    }

    function save(income) {
        return $http.post(baseApi + clientId + '/incomes', income);
    }

    function update(income) {
        return $http.put(baseApi + clientId + '/incomes/' + Income.id, income);
    }
}