angular
  .module('app')
  .component('reserveBed', {
    templateUrl: 'app/reservations/reserveBed.html',
    controller: reserveBedCtrl,
    controllerAs: 'reserveBed'
  });

function reserveBedCtrl($stateParams, agencyApi, reservationApi, nearMeMiles, clientsApi, restBaseApi, $http) {
  const vm = this;

  vm.$onInit = () => {
    vm.newReservation = {};
    vm.sidebarTab = 1;

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

  vm.reserveBeds = () => {
    const agencyId = vm.selectedAgency.id;
    const clientId = vm.newReservation.selected.id;
    const numOfBeds = vm.newReservation.number;

    let reservation = {
      label: "Bed Reservation",
      recorded_by_id: 2,
      client_id: clientId,
      number_in_party: numOfBeds,
      notes: null,
      status: "HOLD"
    }

    $http.post(`${restBaseApi}/agencies/${agencyId}/reservations`, reservation).then(result => {
      vm.newReservation = {};
      const agencyReservedAgainst = vm.agenciesNearby.find(agency => {
        return agency.id === agencyId;
      });
      console.log(agencyReservedAgainst);
      agencyReservedAgainst.beds_available = agencyReservedAgainst.beds_available - numOfBeds;
      vm.selectedAgency = undefined;
    });
  }

  vm.selectAgency = agency => {
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
