angular
  .module('app')
  .component('clientDetail', {
    templateUrl: 'app/clients/clientDetail.html',
    controller: clientDetail,
    controllerAs: 'Client'
  });

function clientDetail($stateParams, clientsApi, 
    disabilitiesApi, disabilityResponsesApi, clientDisabilitiesApi,
    clientEducationEmploymentsApi, clientHealthApi, clientIncomesApi,
    educationLevelsApi, employmentTypesApi, healthStatusesApi,
    notEmployedReasonsApi, noYesApi, schoolStatusesApi, whenoccursApi) {
    const cd = this;
    cd.clientHealthViability = 100;

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

            clientEducationEmploymentsApi.all(cd.client.id).then(function (cee) {
                cd.clientEducationEmployment = cee.data;

                if (cd.clientEducationEmployment && cd.clientEducationEmployment.length > 0) {
                    let cle = cd.clientEducationEmployment[0];

                    if (cle.educationlevelid) {
                        if (cle.educationlevelid !== 5 && cle.educationlevelid !== 6) {
                            cd.clientHealthViability -= 11;
                        }
                    } else {
                        cd.clientHealthViability -= 11; 
                    }

                    if (cle.employmenttypeid) {
                        if (cle.employmenttypeid === 2 || cle.employmenttypeid === 3) {
                            cd.clientHealthViability -= 11;
                        }    
                    } else {
                        cd.clientHealthViability -= 11;
                    }
                    if (cle.notemployedreasonid) {
                        if (cle.notemployedreasonid === 3 || cle.notemployedreasonid == 4) {
                            cd.clientHealthViability -= 11;
                        }
                    } else {
                        cd.clientHealthViability -= 11;   
                    }                                        
                }

                _.each(cd.clientEducationEmployment, function (ce) {           
                    educationLevelsApi.one(ce.educationlevelid).then(function (res) {
                        ce.educationLevel = res.data.name;
                    });
                    schoolStatusesApi.one(ce.schoolstatusid).then(function (res) {
                        ce.schoolStatus = res.data.name;
                    }); 
                    
                    employmentTypesApi.one(ce.employmenttypeid).then(function (res) {
                        ce.employmentType = res.data.name;
                        
                    });                  
                    
                    notEmployedReasonsApi.one(ce.notemployedreasonid).then(function (res) {
                        ce.notEmployedReason = res.data.name;
                    });                                        
                })
            });

            clientHealthApi.all(cd.client.id).then(function (ch) {
                cd.clientHealth = ch.data;
                _.each(cd.clientHealth, function(c) {
                    healthStatusesApi.one(c.generalhealthstatus).then(function (n) {
                        c.generalHealth = n.data.name;
                    });
                    healthStatusesApi.one(c.mentalhealthstatus).then(function (n) {
                        c.mentalHealth = n.data.name;
                    });                    
                    whenoccursApi.one(c.whenoccured).then(function (w) {
                        c.dvWhenOccured = w.data.name;
                    });
                    noYesApi.one(c.pregnancystatus).then(function (n) {
                        c.pregnant = n.data.name;
                    }); 
                });
                if (cd.clientHealth && cd.clientHealth.length > 0) {
                    if (cd.clientHealth[0].generalhealthstatus && cd.clientHealth[0].generalhealthstatus > 3) {
                        cd.clientHealthViability -= 17;   
                    }
                    if (cd.clientHealth[0].mentalhealthstatus && cd.clientHealth[0].mentalhealthstatus > 3) {
                        cd.clientHealthViability -= 17;   
                    }                    
                } else {
                    cd.clientHealthViability -= 35;
                }
            });

            clientIncomesApi.all(cd.client.id).then(function (ci) {
                cd.clientIncomes = ci.data;
                if (cd.clientIncomes) {
                    if(cd.clientIncomes[0].totalmonthlyincome < 600) {
                        cd.clientHealthViability -= 35;
                    }
                } else {
                    cd.clientHealthViability -= 35;
                }
            });

        });

        disabilitiesApi.all().then(function (response) {
            cd.disabilities = response.data;
        });
    }
}