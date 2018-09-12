function AccountDetailConfig($stateProvider) {
  'ngInject';

  $stateProvider.state('app.account-detail', {
    url: '/account/:id',
    controller: 'AccountDetailCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'areas/accounts/account-detail/account-detail.html',
    title: 'Account Detail',
    resolve: {
      currentAuth: (AuthService, $state) => {
        return AuthService.$requireSignIn().then(auth => {
          if (!auth.emailVerified) {
            $state.go('app.profile');
          }
          return auth;
        });
      },
      account: (AccountService, $stateParams) => {
        return AccountService.getAccount($stateParams.id);
      }
    }
  });
}

export default AccountDetailConfig;