class FeaturesCtrl {
  constructor(Features, Accounts, $http, $q) {
    'ngInject';

    this._Features = Features;
    this._Accounts = Accounts;

    this.features = this._Features.all
    
  }
  
}


export default FeaturesCtrl;
