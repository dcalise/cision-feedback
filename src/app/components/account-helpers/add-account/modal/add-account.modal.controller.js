// const TAB_INDUSTRY = 'industry', TAB_DEMOGRAPHICS = 'demographics';

export default class AddAccountModalController {
  constructor(AccountService, $uibModalInstance) {
    'ngInject';
    this._$uibModalInstance = $uibModalInstance;
    this._AccountService = AccountService;
    
  }

  addNewAccount(accountForm) {
    let duplicate = this._AccountService.accounts.some(function(account){
      return account.cid === accountForm.cid
    })

    if (duplicate) {
      this.errors = 'An account with this ID already exists.'
    } else {
      this._AccountService.add(accountForm).then(
        (account) => {
          this._$uibModalInstance.close(account)
        }
      );
    }
  }
}