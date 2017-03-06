function FeatureCreateConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feature-create', {
    url: '/feature/create',
    controller: 'FeatureCreateCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feature-create/feature-create.html',
    title: 'Create New Feature Request'
  });

};

export default FeatureCreateConfig;
