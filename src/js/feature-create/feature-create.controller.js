class FeedbackCreateCtrl {
  constructor(Accounts, Features, $state, profile, currentAuth) {
    'ngInject';

    this._$state = $state;

    this._Accounts = Accounts;
    this._Features = Features;
    this._currentAuth = currentAuth;
    this._profile = profile;

  }

  addAccountAndFeature() {
    if (this.newAccount === true) {
      this._Accounts.add(this.accountForm).then(
        (account) => {
          let accountTieObject = {
            accountKey: account.key,
            accountTie: this.featureForm.accountTie
          }
          this._Features.add(this.featureForm, this._currentAuth, this._profile, accountTieObject).then(
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
    } else {
      this._Features.add(this.featureForm, this._currentAuth, this._profile, this.accountForm.selectedAccounts).then(
        () => {
          this._$state.go('app.features');
        },
        (err) => {
          this.featureForm.isSubmitting = false;
          console.log(err);
        }
      )
    }
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
