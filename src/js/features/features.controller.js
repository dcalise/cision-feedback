class FeaturesCtrl {
  constructor(Features, $http, $q) {
    'ngInject';

    this._Features = Features;

    this.features = this._Features.all
    
  }
  
}


export default FeaturesCtrl;
