angular
  .module('app')
  .factory('whenoccursApi', whenoccursApi);

function whenoccursApi($http) {
    var baseApi = "http://gh6api.herokuapp.com/whenoccurs"
    
    return {
        all: getWhenOccurs,
        one: getWhenOccursInstance
    }

    function getWhenOccurs() {
        return $http.get(baseApi, { cache: true});
    }

    function getWhenOccursInstance(id) {
        return $http.get(baseApi + '/' + id, { cache: true});
    }
}