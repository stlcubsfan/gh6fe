angular
  .module('app')
  .component('clientDetail', {
    templateUrl: 'app/clients/clientDetail.html',
    controller: clientDetail,
    controllerAs: 'Client'
  });

function clientDetail($stateParams, clientsApi, disabilitiesApi) {
    const cd = this;

    init();

    function init() {
        clientsApi.one($stateParams.clientId).then(function (c) {
            cd.client = c.data;
        });

        disabilitiesApi.all().then(function (response) {
            cd.disabilities = response.data;
        });
    }
}