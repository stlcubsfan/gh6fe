angular
  .module('app')
  .component('clientDetail', {
    templateUrl: 'app/clients/clientDetail.html',
    controller: clientDetail,
    controllerAs: 'Client'
  });

function clientDetail($stateParams, clientsApi) {
    const cd = this;

    init();

    function init() {
        clientsApi.one($stateParams.clientId).then(function (c) {
            cd.client = c.data;
        });
        
    }
}