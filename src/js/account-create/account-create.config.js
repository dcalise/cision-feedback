function AccountCreateConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.account-create', {
    url: '/account/create',
    controller: 'AccountCreateCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'account-create/account-create.html',
    title: 'Add New Account',
    resolve: {
      currentAuth: function(AuthService) {
        return AuthService.$requireSignIn()
      },
      profile: function(UserService, AuthService) {
        return AuthService.$requireSignIn().then(
          (auth) => {
            return UserService.getProfile(auth.uid).$loaded()
          }
        )
      }
    }
  });

};

export default AccountCreateConfig;
