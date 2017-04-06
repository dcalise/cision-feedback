class FeatureCtrl {
  constructor(feature, Features, Accounts, $stateParams, Users) {
    'ngInject';

    this._$stateParams = $stateParams;

    this._feature = feature;
    this._Accounts = Accounts;
    this._Features = Features;

    this._featureDetail = {
      accountsMeta: [],
      totalValue: 0
    }

    angular.forEach(this._feature.accounts, (account) => {
      Accounts.getAccount(account).then(
        (account) => {
          this._featureDetail.accountsMeta.push(account)
          this._featureDetail.totalValue += parseInt(account.value)
        }
      )
    })
    this._featureDetail.requester = Users.getProfile(feature.requesterUID);

    console.log(this._feature.accounts)
    console.log(this._featureDetail)

  }

  addAccount() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        this._feature.accounts.push(account)
        // this._Features.addAccountToFeature(account.key, this._feature.$id).then(
        //   (feature) => {
        //     this.feature = feature
        //     this.feature.$save()
        //   }
        // )
        this._feature.$save().then(
          () => console.log(this._feature)
        )
        // this.feature.$save().then(
        //   () => console.log(this.feature)
        // )


      },
      (error) => { console.log(error) }
    )
  }

}


export default FeatureCtrl;
