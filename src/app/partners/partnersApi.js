angular.module('app')
    .factory('partnersApi', partnersApi);

function partnersApi($http) {
    let baseApi = 'http://gh6api.herokuapp.com/partners'
    
    return {
        all: all,
        one: one,
        opportunities: opportunities,
        clientOpportunities: clientOpportunities
    }

    function all() {
        return $http.get(baseApi);
    }

    function one(id) {
        return $http.get(baseApi + '/' + id);
    }

    function opportunities(partnerId) {
        return $http.get(baseApi + '/' + partnerId + '/opportunities')
    }

    function clientOpportunities(partnerId, opportunityId) {
        return $http.get(baseApi + '/' + partnerId + '/opportunities/' + opportunityId)
    }

}