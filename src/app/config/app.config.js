function AppConfig(
    $httpProvider,
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    toastrConfig
) {
    'ngInject';

    var config = {
        apiKey: 'AIzaSyDwKDlKS4wIesup_oJHlxqlV6XQFr3uMPU',
        authDomain: 'cision-feedback-dev.firebaseapp.com',
        databaseURL: 'https://cision-feedback-dev.firebaseio.com',
        projectId: 'cision-feedback-dev',
        storageBucket: 'cision-feedback-dev.appspot.com',
        messagingSenderId: '984448149929'
    };
    firebase.initializeApp(config);

    // $httpProvider.interceptors.push(authInterceptor);
    $stateProvider.state('app', {
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
