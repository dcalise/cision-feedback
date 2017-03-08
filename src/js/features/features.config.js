function FeaturesConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.features', {
    url: '/features',
    controller: 'FeaturesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'features/features.html',
    title: 'Features'
  });

};

export default FeaturesConfig;
