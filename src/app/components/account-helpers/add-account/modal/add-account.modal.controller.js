export default class AddAccountModalController {
  constructor(AccountService, $uibModalInstance) {
    'ngInject';
    this._$uibModalInstance = $uibModalInstance;
    this._AccountService = AccountService;

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