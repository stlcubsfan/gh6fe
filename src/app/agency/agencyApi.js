angular
  .module('app')
  .factory('agencyApi', agencyApi);

function agencyApi($http, restBaseApi) {
    var baseApi = `${restBaseApi}/agencies`,
        STORAGE_KEY = 'labreAgency';

    return {
        all: getAgencies,
        one: getAgency,
        setCurrent: setCurrent,
        getCurrent: getCurrent,
        getAgenciesNearMe: getAgenciesNearMe
    }

    function getAgencies(shouldBustCache) {
        let cacheObj = {
            cache: true
        };

        if (shouldBustCache) {
            cacheObj.cache = false;
        }

        return $http.get(baseApi, cacheObj);
    }

    function getAgency(id) {
        return $http.get(baseApi + '/' + id);
    }

    function setCurrent(id) {
        window.localStorage[STORAGE_KEY] = id;
    }

    function getCurrent(shouldBustCache) {
        let current = window.localStorage[STORAGE_KEY];

        return getAgencies(shouldBustCache).then(function (response) {
            if (!current) {
                current = 1;
            }

            return _.find(response.data, {id: parseInt(current)});
        });

    }

    function getAgenciesNearMe(params) {
      return $http.get(baseApi, {
        params: params
      });
    }
}
