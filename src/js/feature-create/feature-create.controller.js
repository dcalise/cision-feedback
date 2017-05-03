class FeedbackCreateCtrl {
  constructor(Accounts, Features, $state, profile, currentAuth) {
    'ngInject';

    this._$state = $state;

    this._Accounts = Accounts;
    this._Features = Features;
    this._currentAuth = currentAuth;
    this._profile = profile;

    // add existing accounts
    this.accountForm = {
      new: false
    }

    this.accountsMeta = []

    this.accountSelected = (selected) => {
      if (selected) {
        this.getAccountMeta(selected.originalObject.$id)
        return this.accountForm.selectedAccounts.push(selected.originalObject.$id)
      }
    }

    this.getAccountMeta = (accountId) => {
     return Accounts.getAccount(accountId).then(
       (account) => {
         this.accountsMeta.push(account)
       }
     )
    }

  }

  removeAccountFromAddList(i) {
    this.accountsMeta.splice(i,1)
    this.accountForm.selectedAccounts.splice(i,1)
  }

  addAccountAndFeature() {
    if (this.accountForm.new === true) {
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
