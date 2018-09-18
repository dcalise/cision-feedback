class AccountDetailCtrl {
  constructor(account, profile) {
    'ngInject';

    this.account = account;
    this.profile = profile;

  }

  $onInit() {
    if (this.profile.roles && this.profile.roles.admin === true) {
      this.userIsAdmin = true;
    }

    this.showFeatureSummary = true;
  }

  updateAccount() {
    return this.account.$save();
  }

}

export default AccountDetailCtrl;