class FeaturesCtrl {
  constructor(Features, Accounts, $http, $q) {
    'ngInject';

    this._Features = Features;
    this._Accounts = Accounts;

    this.features = this._Features.all

    this.features.$loaded().then(function(features){
      angular.forEach(features, function(feature) {

        feature.accountsMeta = [];
        angular.forEach(feature.accounts, function(account) {
          Accounts.getAccount(account).then(
            (account) => feature.accountsMeta.push(account)
          )
        })
        
      })
    });
    
  }
  
}


export default FeaturesCtrl;
