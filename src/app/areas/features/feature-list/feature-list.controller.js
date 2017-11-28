class FeatureListCtrl {
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
            AccountService.getAccount(account.accountKey).then(
              (account) => {
                feature.accountsMeta.push(account)
                feature.totalValue += parseInt(account.value)
              }
            )
          })
          
        })
      }
    )

    this.tableWidth = 'container'

    this.sortType = 'date';
    this.sortReverse = true;  // set the default sort order
    this.searchFeatures = '';

    this.columns = {
      status: {
        display: true,
        displayName: "Status"
      },
      labels: {
        display: true,
        displayName: "Labels"
      },
      summary: {
        display: true,
        displayName: "Summary"
      },
      originalRequester: {
        display: true,
        displayName: "Original Requester"
      },
      date: {
        display: true,
        displayName: "Date"
      },
      totalValue: {
        display: true,
        displayName: "Total Value"
      }
    }
  }
  
}


export default FeatureListCtrl;
