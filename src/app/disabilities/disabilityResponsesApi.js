angular
  .module('app')
  .factory('disabilityResponsesApi', disabilityResponsesApi);

function disabilityResponsesApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/disabilityResponses"
    return {
        all: getResponses,
        one: getResponse
    }

    function getResponses() {
        return $http.get(baseApi);
    }

    function getResponse(id) {
        return $http.get(baseApi + '/' + id);
    }
}