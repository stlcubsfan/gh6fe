angular
  .module('app')
  .component('clients', {
    templateUrl: 'app/clients/clients.html',
    controller: makeClients,
    controllerAs: 'Clients'
  });

function makeClients(clientsApi) {
    let vm = this;

    vm.getClassForHousing = clientsApi.getStatusColorForHousing;
    vm.getClassForEmployment = clientsApi.getStatusColorForEmployment;

    clientsApi.all().then(function (response) {
      vm.clients = response.data;
    });
}
