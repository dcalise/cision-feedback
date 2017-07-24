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

export default FeatureCreateConfig;
