angular
  .module('app')
  .component('reserveBed', {
    templateUrl: 'app/reservations/reserveBed.html',
    controller: reserveBedCtrl,
    controllerAs: 'reserveBed'
  });

function reserveBedCtrl($stateParams, agencyApi, reservationApi, nearMeMiles, clientsApi) {
  const vm = this;

  vm.$onInit = () => {
    vm.newReservation = {};

    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;
      vm.totalBeds = vm.currentAgency.beds_available;

      const params = {
        xpos: vm.currentAgency.pos.x,
        ypos: vm.currentAgency.pos.y,
        range: nearMeMiles
      };

      agencyApi.getAgenciesNearMe(params).then(agencies => {
        vm.agenciesNearby = agencies.data;
        vm.agenciesNearby.forEach(agency => {
          agency.distance = parseFloat(agency.distance);
        });
      });
    });

    clientsApi.all().then(clients => {
      vm.clients = clients.data;
      vm.clients.forEach(client => {
        client.full_name = client.first_name + ' ' + client.last_name;
      })
    });
  }

  vm.selectAgency = agency => {
    console.log(agency);
    vm.selectedAgency = agency;
    reservationApi.all(vm.selectedAgency.id).then(results => {
      vm.selectedAgency.reservations = results.data;
      vm.selectedAgency.reservations.forEach(reservation => {
        reservation.client = vm.clients.filter(client => {
          return client.id === reservation.client_id;
        });
      });
    });
  }
}
