class FeedbackCreateCtrl {
  constructor(Accounts, Features, $state, profile, currentAuth) {
    'ngInject';

    this._$state = $state;

    this._Accounts = Accounts;
    this._Features = Features;
    this._currentAuth = currentAuth;
    this._profile = profile;
    
  }

  addAccount() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        console.log(account)
      },
      (error) => { console.log(account) }
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
