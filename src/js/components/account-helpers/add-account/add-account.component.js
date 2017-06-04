class AddAccountCtrl {
  constructor(Accounts) {
    'ngInject';

    this.new = false;
    
    this.accountSelected = (selected) => {
      if (selected) {
        console.log(selected)
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

  }

  removeAccountFromAddList(i) {
    this.existingAccountsMeta.splice(i,1)
    this.accountForm.selectedAccounts.splice(i,1)
  }
  
}

let AddAccount = {
  bindings: {
    data: '=',
    featureForm: '=',
    accountForm: '=',
    searchData: '<',
    searchFunction: '<',
    deleteCb: '&'
  },
  controller: AddAccountCtrl,
  templateUrl: 'components/account-helpers/add-account/add-account.html'
};

export default AddAccount;
