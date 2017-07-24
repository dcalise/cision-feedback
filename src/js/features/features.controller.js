class FeaturesCtrl {
  constructor(FeatureService, AccountService, $http, $q) {
    'ngInject';

    this._FeatureService = FeatureService;

    this.features = this._FeatureService.all

    this.features.$loaded().then(
      (features) => {
        angular.forEach(features, function(feature) {

          feature.accountsMeta = [];
          feature.totalValue = 0;
          angular.forEach(feature.accounts, function(account) {
            AccountsService.getAccount(account.accountKey).then(
              (account) => {
                feature.accountsMeta.push(account)
                feature.totalValue += parseInt(account.value)
              }
            )
          })
          
        })
      }
    )

    this.sortType = 'subject';
    this.sortReverse = false;  // set the default sort order
    this.searchFeatures = ''; 
  }
  
}


export default FeaturesCtrl;
