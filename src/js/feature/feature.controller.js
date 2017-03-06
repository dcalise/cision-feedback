class FeatureCtrl {
  constructor(Features, $http, $q, $stateParams) {
    'ngInject';

    Features.getFeature($stateParams.id).then(
      (feature) => this.feature = feature
    );

  }
}


export default FeatureCtrl;
