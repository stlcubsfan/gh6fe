angular
  .module('app')
  .factory('reservationApi', reservationApi);

function reservationApi($http, restBaseApi, agencyApi) {
  const currentAgency = agencyApi.getCurrent().then(agency => {
    return agency;
  });
  const baseApi = `${restBaseApi}/agencies`;

  function getReservationsForAgency(id) {
    id = id || currentAgency.id;
    return $http.get(`${baseApi}/${id}/reservations`);
  }

  function getReservation(reservationId, agnecyId) {
    agencyId = agencyId || currentAgency.id;
    return $http.get(`${baseApi}/${agencyId}/reservations/${reservationId}`);
  }

  function checkin(agnecyId, clientId, number_in_party) {
    let reservation = {
     label: "Checked-In to Shelter",
     recorded_by_id: 2,
     client_id: clientId,
     number_in_party: number_in_party,
     notes: null,
     status: "CHECKEDIN"
    }

    return $http.post(baseApi + '/' + agnecyId + '/reservations', reservation);
  }

  function create(agencyId, clientId, number) {
    let reservation = {
      label: "Bed Reservation",
      recorded_by_id: 2,
      client_id: clientId,
      number_in_party: number,
      notes: null,
      status: "HOLD"
    }

    return $http.post(`${baseApi}/${agencyId}/reservations`, reservation);
  }

  return {
    all: getReservationsForAgency,
    one: getReservation,
    checkin: checkin,
    create: create
  }
}
