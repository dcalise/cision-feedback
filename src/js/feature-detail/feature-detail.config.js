function FeatureDetailConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature-detail', {
    url: '/feature/:id',
    controller: 'FeatureCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feature-detail/feature-detail.html',
    title: 'Feature Detail',
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
      },
      feature: function(FeatureService, $stateParams) {
        return FeatureService.getFeature($stateParams.id).$loaded()
      },
      comments: function($stateParams, CommentService){
        return CommentService.forFeature($stateParams.id).$loaded();
      }
    }
  });

};

export default FeatureDetailConfig;
