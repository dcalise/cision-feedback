function AppRun(AppConstants, $rootScope, $state) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
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

  // opening ui-sref in new window
  $rootScope.navigate = ($event, to, params) => {
    console.log($event)
    if ($event.metaKey) {
      let url = $state.href(to, params, {absolute: true})
      window.open(url, '_blank');
    } else {
      $state.go(to, params);
    }
  }

}

export default AppRun;
