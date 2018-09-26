class AccountListCtrl {
    constructor(
        $localStorage,
        FeatureService,
        AccountService,
        moment
    ) {
        'ngInject';

        this._AccountService = AccountService;
        this.$localStorage = $localStorage;
        this._FeatureService = FeatureService;
        this._moment = moment;
    }

    $onInit() {
        this.$localStorage.accountsTimestamp = this._moment();

        this.accounts = this._AccountService.accounts;
    }
}

export default AccountListCtrl;
