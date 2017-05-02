class FeedbackCreateCtrl {
  constructor(Accounts, Features, $state, profile, currentAuth) {
    'ngInject';

    this._$state = $state;

    this._Accounts = Accounts;
    this._Features = Features;
    this._currentAuth = currentAuth;
    this._profile = profile;
  }

  accountSearch(str, accounts) {
    var matches = [];
    accounts.forEach(function(account) {
      if (account.name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0 || account.cid.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
        matches.push(account);
      }
    });
    return matches;
  };

  addAccountAndFeature() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        this._Features.add(this.featureForm, this._currentAuth, this._profile, account.key).then(
          () => {
            this._$state.go('app.features');
          },
          () => {
            this.featureForm.isSubmitting = false;
            console.log('errors');
          }
        )
      },
      (error) => { console.log(error) }
    )
  }

  addFeature() {
    this.featureForm.isSubmitting = true;

    this._Features.add(this.featureForm, this._currentAuth, this._profile).then(
      () => {
        this.featureForm.isSubmitting = false;
        console.log('added!');
      },
      () => {
        this.featureForm.isSubmitting = false;
        console.log('errors');
        console.log(err);
      }
    )
  }

}


export default FeedbackCreateCtrl;
