angular
  .module('app')
  .component('checkIn', {
    templateUrl: 'app/clients/checkIn.html',
    controller: makecheckIn,
    controllerAs: 'CheckIn'
  });

function makecheckIn(clientsApi) {
    let vm = this;

    vm.newCheckIn = {};

    clientsApi.all().then(function (response) {
      vm.clients = response.data;
    });

    vm.availableEthnicities = [
      {
        id: 'american_indian',
        title: 'American Indian'
      },
      {
        id: 'asian',
        title: 'Asian'
      },
      {
        id: 'black',
        title: 'Black'
      },
      {
        id: 'white',
        title: 'White'
      },
      {
        id: 'no_race',
        title: 'No Race'
      },
      {
        id: 'hi_or_pac_island',
        title: 'Hawaiian or Pacific Islander'
      }
    ];

    vm.createClient = function () {
      if (vm.ethnicitySelections) {
        vm.ethnicitySelections.forEach(selctionTitle => {
          let target = _.find(vm.availableEthnicities, {title: selctionTitle});
          vm.newCheckIn[target.id] = true;
        });
      }

      clientsApi.create(vm.newCheckIn).then(response => {
        console.log(response);
      })
    };

}
