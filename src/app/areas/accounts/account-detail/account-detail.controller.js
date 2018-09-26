class AccountDetailCtrl {
    constructor(AppConstants, account, profile) {
        'ngInject';

        this.accountTypes = AppConstants.strings.account.accountTypes;
        this.countries = AppConstants.strings.account.countries;

        this.account = account;
        this.profile = profile;

    }

    $onInit() {
        if (this.profile.roles && this.profile.roles.admin === true) {
            this.isUserAdmin = true;
        }

        this.showFeatureSummary = true;
        this.showCustomerNotes = true;
    }

    updateAccount(type) {
        if (type === 'value') {
            this.account.value = this.account.value.replace(/[^0-9.]/g, '');
        }
        return this.account.$save();
    }

}

export default AccountDetailCtrl;
