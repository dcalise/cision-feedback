function FeatureConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature', {
    url: '/feature/:id',
    controller: 'FeatureCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feature/feature.html',
    title: 'Feature Detail',
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
      },
      feature: function(Features, $stateParams) {
        return Features.getFeature($stateParams.id).$loaded()
      },
      comments: function($stateParams, Comments){
        return Comments.forFeature($stateParams.id).$loaded();
      }
    }
  });

};

export default FeatureConfig;
