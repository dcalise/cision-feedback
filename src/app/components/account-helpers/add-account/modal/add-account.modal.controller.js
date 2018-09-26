export default class AddAccountModalController {
    constructor(AppConstants, AccountService, $uibModalInstance) {
        'ngInject';
        this._$uibModalInstance = $uibModalInstance;
        this._AccountService = AccountService;

        this.accountTypes = AppConstants.strings.account.accountTypes;
        this.countries = AppConstants.strings.account.countries;

        this.customerProductOptions = AppConstants.strings.account.currentPlatforms;
        this.prospectProductOptions = AppConstants.strings.account.prospectPlatforms;
    }

    addNewAccount(accountForm) {
        let duplicate = this._AccountService.accounts.some(function (account) {
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
