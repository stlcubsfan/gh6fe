angular
  .module('app')
  .component('reservationsBox', {
    templateUrl: 'app/reservations/reservationsBox.html',
    controller: reservationsBoxCtrl,
    controllerAs: 'reservationsBox'
  });

function reservationsBoxCtrl($stateParams, reservationApi, agencyApi) {
  const vm = this;

  init();

  function init() {
    agencyApi.getCurrent().then(agency => {
      vm.currentAgency = agency;

      reservationApi.all(vm.currentAgency.id).then(results => {
        vm.reservations = results.data;
        vm.openReservations = vm.reservations.filter(reservation => {
          return reservation.status === "HOLD";
        });
      });
    });
  }
}
