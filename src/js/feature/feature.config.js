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
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn()
      }]
    }
  });

};

export default FeatureConfig;
