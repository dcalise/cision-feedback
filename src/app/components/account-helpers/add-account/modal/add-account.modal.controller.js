export default class AddAccountModalController {
  constructor(AccountService, $uibModalInstance) {
    'ngInject';
    this._$uibModalInstance = $uibModalInstance;
    this._AccountService = AccountService;

    this.customerProductOptions = [
      'ProdFake',
      'NewFake',
      'FakeProd',
      'FPR',
      'Other (Please Specify in Notes)'
    ];

    this.prospectProductOptions = [
      'CompetitorProduct',
      'ProdComp',
      'NotOurProduct',
      'Other (Please Specify in Notes)'
    ];

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
