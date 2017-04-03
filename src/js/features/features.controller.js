class FeaturesCtrl {
  constructor(Features, Accounts, $http, $q) {
    'ngInject';

    this._Features = Features;
    this._Accounts = Accounts;

    this.features = this._Features.all

    this.features.$loaded().then(function(features){
      angular.forEach(features, function(feature) {

        feature.accountsMeta = [];
        Accounts.getAccount(feature.accounts[0]).then(
          (account) => feature.accountsMeta.push(account)
        )
        
      })
    });
    
  }
  
}


export default FeaturesCtrl;
