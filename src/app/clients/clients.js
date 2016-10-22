angular
  .module('app')
  .component('clients', {
    templateUrl: 'app/clients/clients.html',
    controller: makeClients,
    controllerAs: 'Clients'
  });

function makeClients($http) {
    this.hello = 'Hello World!';

    $http.get('https://gh6api.herokuapp.com/agencies?range=20&xpos=38.7591332&ypos=-90.297514').then(function (response) {
        console.log(response);
    })
}
