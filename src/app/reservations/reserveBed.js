angular
  .module('app')
  .component('reserveBed', {
    templateUrl: 'app/reservations/reserveBed.html',
    controller: reserveBedCtrl,
    controllerAs: 'reserveBed'
  });

function reserveBedCtrl($scope, $rootScope, $stateParams, agencyApi, reservationApi, nearMeMiles, clientsApi, restBaseApi, $http, $window) {
  const vm = this;

  vm.$onInit = () => {
    vm.newReservation = {};
    vm.sidebarTab = 1;
    vm.mapConfig = {
      zoom: 12,
      dragging: true,
      enableEventPropagation: true,
      refresh: true
    };

    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;
      vm.totalBeds = parseInt(vm.currentAgency.beds_available);

      vm.mapConfig.center = {
        latitude: vm.currentAgency.pos.y,
        longitude: vm.currentAgency.pos.x
      }

      const params = {
        xpos: vm.currentAgency.pos.x,
        ypos: vm.currentAgency.pos.y,
        range: nearMeMiles
      };

      agencyApi.getAgenciesNearMe(params).then(agencies => {
        vm.agenciesNearby = agencies.data;
        vm.mapConfig.markers = [];
        let i = 0;

        vm.agenciesNearby.forEach(agency => {
          agency.distance = parseFloat(agency.distance);
          vm.mapConfig.markers.push(createMarker(agency, i));
          i++;
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
      const agencyReservedAgainst = vm.agenciesNearby.find(agency => {
        return agency.id === agencyId;
      });
      agencyReservedAgainst.beds_available = agencyReservedAgainst.beds_available - numOfBeds;
      vm.resetSelectingAgency();
    });
  }

  vm.selectAgency = agency => {
    vm.selectedAgency = agency;
    reservationApi.all(vm.selectedAgency.id).then(results => {
      vm.selectedAgency.reservations = results.data;

      vm.selectedAgency.reservations.forEach(reservation => {
        reservation.client = vm.clients.find(client => {
          return client.id === reservation.client_id;
        });
      });
    });
  }

  vm.resetSelectingAgency = () => {
    vm.selectedAgency = undefined;
    vm.newReservation = {};
  }

  $scope.$on('agency-window-button-clicked', (e, agencyId) => {
    let clickedAgency = vm.agenciesNearby.find(agency => {
      return agency.id === agencyId;
    });

    vm.selectAgency(clickedAgency);
  });

  $window.mapWindowButtonClicked = (event) => {
    const id = parseInt(event.target.id.replace('agency-', ''));
    $rootScope.$broadcast('agency-window-button-clicked', id);
  }

  function createMarker(agency, int) {
    return {
      id: int,
      latitude: agency.pos.y,
      longitude: agency.pos.x,
      agency: agency
    };
  };
}
