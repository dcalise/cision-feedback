function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // $httpProvider.interceptors.push(authInterceptor);
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/app-view.html'
    });

  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: true,
  //   rewriteLinks: true
  // });

}

export default AppConfig;
