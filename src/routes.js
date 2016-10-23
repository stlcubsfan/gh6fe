angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });

  $stateProvider
    .state('clients', {
      url: '/clients',
      component: 'clients'
    });

  $stateProvider
    .state('clientDetail', {
      url: '/clients/:clientId',
      component: 'clientDetail'
    });

  $stateProvider
    .state('checkIn', {
      url: '/check-in',
      component: 'checkIn'
    });

  $stateProvider
    .state('programs', {
      url: '/programs',
      component: 'programs'
    });

  $stateProvider
    .state('programDetail', {
      url: '/programs/:programId',
      component: 'programDetail'
    });

  $stateProvider
    .state('reserveBed', {
      url: '/reserveBed',
      component: 'reserveBed'
    });

  $stateProvider
    .state('opportunities', {
      url: '/opportunities',
      component: 'opportunities'
    });    
    
}
