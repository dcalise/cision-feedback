function FeatureCreateConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature-create', {
    url: '/features/create',
    controller: 'FeatureCreateCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feature-create/feature-create.html',
    title: 'Create New Feature Request',
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

export default FeatureCreateConfig;
