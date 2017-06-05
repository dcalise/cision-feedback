class AddAccountCtrl {
  constructor(Accounts, $scope) {
    'ngInject';

    this._$scope = $scope

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
     return Accounts.getAccount(accountId).then(
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
