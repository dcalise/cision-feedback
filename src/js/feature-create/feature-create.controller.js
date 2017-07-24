class FeedbackCreateCtrl {
  constructor(AccountService, FeatureService, $state, profile, currentAuth) {
    'ngInject';

    this._$state = $state;

    this._AccountService = AccountService;
    this._FeatureService = FeatureService;
    this._currentAuth = currentAuth;
    this._profile = profile;

  }

  addAccountAndFeature() {
    if (this.newAccount === true) {
      this._AccountService.add(this.accountForm).then(
        (account) => {
          let accountTieObject = {
            accountKey: account.key,
            accountTie: this.featureForm.accountTie
          }
          // TODO: can we delete profile argument?
          this._FeatureService.add(this.featureForm, this._currentAuth, this._profile, accountTieObject).then(
            () => {
              this._$state.go('app.feature-list');
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
      this._FeatureService.add(this.featureForm, this._currentAuth, this._profile, this.accountForm.selectedAccounts).then(
        () => {
          this._$state.go('app.feature-list');
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

    this._FeatureService.add(this.featureForm, this._currentAuth, this._profile).then(
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
