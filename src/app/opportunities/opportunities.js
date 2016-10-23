angular
  .module('app')
  .component('opportunities', {
    templateUrl: 'app/opportunities/opportunities.html',
    controller: seeOpportunties,
    controllerAs: 'Opportunities'
  });

  function seeOpportunties(partnersApi) {
    let vm = this;

    init();

    function init() {
        let allOpps = [];

        partnersApi.all().then(partners => {
          vm.partners = partners.data;

          _.each(vm.partners, function (partner) {
            partner.opps = [];

            partnersApi.opportunities(partner.id).then(opps => {
              vm.opportunityCount += opps.data.length;


              _.each(opps.data, function (opp) {
                vm.spotCount += Number(opp.spots_open);
                allOpps.push(opp);
                partner.opps.push(opp);
              });

              vm.opps = allOpps;

            });
          });
        });
    }
  }