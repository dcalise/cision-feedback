function AppConfig(
    $stateProvider,
    $urlRouterProvider,
    toastrConfig
) {
    'ngInject';

    var config = {
        apiKey: "AIzaSyDzgjO1R7XC-aJbjUtZWcFWBOfRH3-0ST4",
        authDomain: "miso-79c0b.firebaseapp.com",
        databaseURL: "https://miso-79c0b.firebaseio.com",
        projectId: "miso-79c0b",
        storageBucket: "miso-79c0b.appspot.com",
        messagingSenderId: "718267852756"
    };
    firebase.initializeApp(config);

    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'layout/app-view.html'
    });

    $urlRouterProvider.otherwise('/');

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
