angular
  .module('app')
  .filter('filterAvailBeds', filterAvailBeds);

function filterAvailBeds() {
  return (agencies, availBedsNeeded) => {
    if (!agencies || agencies.length === 0) {
      return [];
    }

    return agencies.filter(agency => {
      return agency.beds_available >= availBedsNeeded;
    });
  }
}
