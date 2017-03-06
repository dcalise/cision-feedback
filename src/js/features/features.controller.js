class FeaturesCtrl {
  constructor(Features, $http, $q) {
    'ngInject';

    Features.getAll().then(
      (features) => this.features = features
    );
    
  }
  
}


export default FeaturesCtrl;
