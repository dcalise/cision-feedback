function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile.html',
      resolve: {
        auth: function($state, Users, Auth) {
          return Auth.$requireSignIn().catch(
            () => $state.go('app.login')
          )
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

export default ProfileConfig;
