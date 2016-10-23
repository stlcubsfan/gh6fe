angular
  .module('app')
  .factory('reservationApi', reservationApi);

function reservationApi($http, restBaseApi, agencyApi) {
  const currentAgency = agencyApi.getCurrent().then(agency => {
    return agency;
  });
  const baseApi = `${restBaseApi}/agencies`;

  return {
    all: getReservationsForAgency,
    one: getReservation,
    checkin: checkin
  }

  function getReservationsForAgency(id) {
    id = id || currentAgency.id;
    return $http.get(`${baseApi}/${id}/reservations`);
  }

  function getReservation(reservationId, agnecyId) {
    agencyId = agencyId || currentAgency.id;
    return $http.get(`${baseApi}/${agencyId}/reservations/${reservationId}`);
  }

  function checkin(agnecyId, clientId) {
    let reservation = {
     label: "Checked-In to Shelter",
     recorded_by_id: null,
     client_id: clientId,
     notes: null,
     status: "CHECKEDIN"
    }

    return $http.post(baseApi + '/' + agnecyId + '/reservations', reservation);
  }
}
