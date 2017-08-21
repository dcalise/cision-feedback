// const TAB_INDUSTRY = 'industry', TAB_DEMOGRAPHICS = 'demographics';

export default class AddAccountModalController {
  constructor(AccountService, $uibModalInstance) {
    'ngInject';
    this._$uibModalInstance = $uibModalInstance;
    this._AccountService = AccountService;
    
  }

  addNewAccount() {
    if (this._AccountService.accountsRef.orderByChild('cid').equalTo(this.accountForm.cid)) {
      this.errors = 'An account with this ID already exists.'
    } else {
      this._AccountService.add(this.accountForm).then(
        (account) => {
          this._$uibModalInstance.close(account)
        }
      );
    }
  }
}