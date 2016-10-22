angular
  .module('app')
  .component('clientDetail', {
    templateUrl: 'app/clients/clientDetail.html',
    controller: clientDetail,
    controllerAs: 'Client'
  });

function clientDetail($stateParams, clientsApi, disabilitiesApi, disabilityResponsesApi, clientDisabilitiesApi) {
    const cd = this;

    init();

    function init() {
        clientsApi.one($stateParams.clientId).then(function (c) {
            cd.client = c.data;
            clientDisabilitiesApi.all(cd.client.id).then(function (cds) {
                cd.clientDisabilities = cds.data;
                _.each(cd.clientDisabilities, function (cd) {
                    disabilitiesApi.one(cd.disabilityid).then(function (res) {
                        cd.disability = res.data.name;
                    });
                    disabilityResponsesApi.one(cd.disabilityresponseid).then(function(res) {
                        cd.disabilityResponse = res.data.name;
                    });
                });
            });
        });

        disabilitiesApi.all().then(function (response) {
            cd.disabilities = response.data;
        });
    }
}