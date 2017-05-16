function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, toastrConfig) {
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
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });

}

export default AppConfig;
