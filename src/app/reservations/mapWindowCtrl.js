angular
  .module('app')
  .controller('mapWindowCtrl', function($scope, $rootScope) {
    console.log('attached!');
    
    $scope.mapWindowButtonClicked = (agency) => {
      console.log('clicked!');
      $rootScope.$broadcast('agency-window-button-clicked', agency);
    }
});
