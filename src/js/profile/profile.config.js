function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile.html',
      resolve: {
        auth: function($state, Users, AuthService) {
          return AuthService.$requireSignIn().catch(
            () => $state.go('app.login')
          )
        },
        profile: function(Users, AuthService) {
          return AuthService.$requireSignIn().then(
            (auth) => {
              return Users.getProfile(auth.uid).$loaded()
            }
          )
        }
      }
    });

};

export default ProfileConfig;
