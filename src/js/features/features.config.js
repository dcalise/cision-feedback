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

export default FeaturesConfig;
