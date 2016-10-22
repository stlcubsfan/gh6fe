angular
  .module('app')
  .factory('agencyApi', agencyApi);

function agencyApi($http) {
    var baseApi = 'http://gh6api.herokuapp.com/agencies',
        STORAGE_KEY = 'labreAgency';

    return {
        all: getAgencies,
        one: getAgency,
        setCurrent: setCurrent,
        getCurrent: getCurrent
    }

    function getAgencies() {
        // todo: if we update agencies, we'll need to clear the cache
        return $http.get(baseApi, {cache: true});
    }

    function getAgency(id) {
        return $http.get(baseApi + '/' + id);
    }

    function setCurrent(id) {
        window.localStorage[STORAGE_KEY] = id;
    }

    function getCurrent() {
        let current = window.localStorage[STORAGE_KEY];

        return getAgencies().then(function (response) {
            if (!current) {
                current = 1;
            }

            return _.find(response.data, {id: parseInt(current)});
        });

    }
}