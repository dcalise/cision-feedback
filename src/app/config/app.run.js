function AppRun(AppConstants, $rootScope, $state) {
    'ngInject';

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.setPageTitle(toState.title);
    });

    $rootScope.$on("$stateChangeError", (event, toState, toParams, fromState, fromParams, error) => {
        if (error === "AUTH_REQUIRED") {
            $state.go('app.login');
        }
    });

    // Helper method for setting the page's title
    $rootScope.setPageTitle = (title) => {
        $rootScope.pageTitle = '';
        if (title) {
            $rootScope.pageTitle += title;
            $rootScope.pageTitle += ' \u2014 ';
        }
        $rootScope.pageTitle += AppConstants.appName;
    };

}

export default AppRun;
