angular
  .module('app')
  .component('manageReservations', {
    templateUrl: 'app/reservations/manageReservations.html',
    controller: manageReservationsCtrl,
    controllerAs: 'reservationMgmt'
  });

function manageReservationsCtrl($scope, $stateParams, reservationApi, agencyApi, clientsApi) {
  const vm = this;

  init();

  function init() {
    clientsApi.all().then(result => {
      vm.clients = result.data;
      vm.clients.forEach(client => {
        client.full_name = `${client.first_name} ${client.last_name}`;
      });
    });

    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;

      reservationApi.all(vm.currentAgency.id).then(results => {
        vm.reservations = results.data;
        vm.reservations.forEach(reservation => {
          reservation.client = vm.clients.find(client => {
            return client.id === reservation.client_id;
          });
        });

        vm.openReservations = vm.reservations.filter(reservation => {
          return reservation.status === "HOLD";
        });
      });
    });
  }

  vm.checkInExistingReservation = reservation => {
    reservation.status = "CHECKEDIN";
    reservationApi.update(vm.currentAgency.id, reservation).then(result => {
      reservation.status = "CHECKEDIN";
    });
  }
}
