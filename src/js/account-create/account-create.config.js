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
      currentAuth: function(Auth) {
        return Auth.$requireSignIn()
      },
      profile: function(Users, Auth) {
        return Auth.$requireSignIn().then(
          (auth) => {
            return Users.getProfile(auth.uid).$loaded()
          }
        )
      }
    }
  });

};

export default AccountCreateConfig;
