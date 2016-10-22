angular
  .module('app')
  .component('clients', {
    templateUrl: 'app/clients/clients.html',
    controller: makeClients,
    controllerAs: 'Clients'
  });

function makeClients() {
    this.hello = 'Hello World!';
}
