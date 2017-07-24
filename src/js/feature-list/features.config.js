function FeaturesConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature-list', {
    url: '/features',
    controller: 'FeaturesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feature-list/features.html',
    title: 'Features',
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

export default FeaturesConfig;
