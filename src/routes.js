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
    .state('programs', {
      url: '/programs',
      component: 'programs'
    });

  $stateProvider
    .state('programDetail', {
      url: '/programs/:programId',
      component: 'programDetail'
    });
}
