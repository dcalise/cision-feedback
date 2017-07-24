function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile.html',
      resolve: {
        auth: function($state, UserService, AuthService) {
          return AuthService.$requireSignIn().catch(
            () => $state.go('app.login')
          )
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

export default ProfileConfig;
