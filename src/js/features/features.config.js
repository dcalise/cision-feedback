function FeaturesConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.features', {
    url: '/features',
    controller: 'FeaturesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'features/features.html',
    title: 'Features',
    resolve: {
      currentAuth: function(AuthService) {
        return AuthService.$requireSignIn()
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

export default FeaturesConfig;
