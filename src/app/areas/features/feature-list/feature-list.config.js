function FeatureListConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature-list', {
    url: '/features',
    controller: 'FeatureListCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'areas/features/feature-list/feature-list.html',
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

export default FeatureListConfig;
