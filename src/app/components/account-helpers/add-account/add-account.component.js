class AddAccountCtrl {
  constructor(AccountService, $scope) {
    'ngInject';

    this._$scope = $scope

    this.accountTieOptions = [
      'Platform GAP. Customer will not upgrade to C3 without this feature',
      'Customer CHURNED because this feature was not available',
      'Customer AT RISK because this feature is not available',
      'Prospect LOST because this feature is not available',
      'None of the above'
    ];

    this.customerProductOptions = [
      'Cision PR Edition',
      'CisionPoint',
      'Visible Intelligence',
      'MediaVantage',
      'HARO',
      'ProfNet',
      'OMC',
      'CNW Access',
      'MNR',
      'Others (Please Specify in Notes)'
    ];

    this.prospectProductOptions = [
      'Meltwater',
      'TrendKite',
      'NASDAQ',
      'BusinessWire',
      'Others (Please Specify in Notes)'
    ];

    this.platformOptions = [
      'C3',
      'OMC',
      'CPRE',
      'CP',
      'MyGorkana',
      'MediaVantage',
      'PRWeb Subscription',
      'Visible'
    ];
    this.priorPlatformOptions = [
      'CPRE',
      'CP',
      'PRWeb Subscription',
      'MyGorkana',
      'MediaVantage',
      'OMC',
      'Upgraded from Agility',
      'Net New'
    ];

    this.accountSelected = (selected) => {
      if (selected) {
        this.getAccountMeta(selected.originalObject.$id)
        let accountTieObject = {
          accountKey: selected.originalObject.$id,
          accountTie: null
        }
        return this.accountForm.selectedAccounts.push(accountTieObject)
      }
    }

    this.existingAccountsMeta = []

    this.getAccountMeta = (accountId) => {
     return AccountService.getAccount(accountId).then(
       (account) => {
         this.existingAccountsMeta.push(account)
       }
     )
    }

    this.$onChanges = function() {
      var reset = {
        resetForm: function(){
          $scope.$ctrl.existingAccountsMeta = []
        }
      }
      this.resetForm({reset: reset});
    }

  }

  removeAccountFromAddList(i) {
    this.existingAccountsMeta.splice(i,1)
    this.accountForm.selectedAccounts.splice(i,1)
  }

  resetAccountForm(added) {
    if (this.accountForm.name || this.accountForm.cid || this.accountForm.selectedAccounts.length > 0) {
      let sure;
      if (!added) {
        sure = confirm('Are you sure you want to delete your draft?')
      }
      if (sure || added) {
        this.accountForm = {}
        this._$scope.$ctrl.existingAccountsMeta = [];
        this._$scope.$parent.showAccountForm = false
      }
    } else {
      this._$scope.$parent.showAccountForm = false
    }
  }
  
}

let AddAccount = {
  bindings: {
    newAccount: '=',
    resetForm: '&',
    featureForm: '=',
    accountForm: '=',
    createFeature: '<',
    searchData: '<',
    searchFunction: '<'
  },
  controller: AddAccountCtrl,
  templateUrl: 'components/account-helpers/add-account/add-account.html'
};

export default AddAccount;
