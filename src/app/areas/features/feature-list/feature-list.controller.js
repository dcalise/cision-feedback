class FeatureListCtrl {
  constructor($http, $q, $localStorage, FeatureService, AccountService) {
    'ngInject';

    this._FeatureService = FeatureService;
    this.$localStorage = $localStorage;

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

    this.sortReverse = true;  // set the default sort order
    this.searchFeatures = '';
  }

  $onInit() {
    this.sortType = this.getColumnSort() || 'date';
  }

  sortColumn(col) {
    this.sortType = col;
    this.setColumnSort(this.sortType);
  }

  setColumnSort(col) {
    this.$localStorage.sortTypeSaved =  col;
  }

  getColumnSort() {
    return this.$localStorage.sortTypeSaved;
  }

}


export default FeatureListCtrl;
