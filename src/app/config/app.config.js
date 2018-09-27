const fbConfig = require('./keys/prod.json');

function AppConfig(
    $stateProvider,
    $urlRouterProvider,
    toastrConfig
) {
    'ngInject';

    var config = {
        apiKey: fbConfig.apiKey,
        authDomain: fbConfig.authDomain,
        databaseURL: fbConfig.databaseURL,
        projectId: fbConfig.projectId,
        storageBucket: fbConfig.storageBucket,
        messagingSenderId: fbConfig.messagingSenderId
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
