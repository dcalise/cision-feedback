class AccountDetailCtrl {
  constructor(account, profile, currentAuth) {
    'ngInject';

    this.account = account;
    this.profile = profile;

  }

  $onInit() {
    if (this.profile.roles && this.profile.roles.admin === true) {
      this.userIsAdmin = true;
    }
  }

  updateCountry() {
    return this.account.$save();
  }

}

export default AccountDetailCtrl;