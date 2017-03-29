function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // $httpProvider.interceptors.push(authInterceptor);
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/app-view.html',
      resolve: {
        currentAuth: function(Auth) {
          return Auth.$waitForSignIn()
        }
      }
    });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
