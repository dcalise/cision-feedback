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
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn()
      }]
    }
  });

};

export default FeaturesConfig;
