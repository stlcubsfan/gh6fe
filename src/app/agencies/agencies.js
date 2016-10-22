angular
  .module('app')
  .factory('agenciesApi', agenciesApi);

function agenciesApi($http, restBaseApi) {
  const baseApi = `${restBaseApi}/agencies`;

  let agenciesApi = {};

  agenciesApi.getAgencies = () => {
    return $http.get(baseApi);
  }

  agenciesApi.getAgency = id => {
    return $http.get(`${baseApi}/${id}`);
  }

  agenciesApi.getAgenciesNearMe = params => {
    return $http.get(baseApi, {
      params: params
    });
  }

  return agenciesApi;
}
