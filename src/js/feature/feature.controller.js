class FeatureCtrl {
  constructor(Features, Accounts, $stateParams, Users) {
    'ngInject';

    this._Accounts = Accounts;
    this._Features = Features;

    Features.getFeature($stateParams.id).then(
      (feature) => {

        feature.accountsMeta = [];
        feature.totalValue = 0;
        angular.forEach(feature.accounts, (account) => {
          Accounts.getAccount(account).then(
            (account) => {
              feature.accountsMeta.push(account)
              feature.totalValue += parseInt(account.value)
            }
          )
        })
        feature.requester = Users.getProfile(feature.requesterUID);
        this.feature = feature

      }
    )

  }

  addAccountAndFeature() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        console.log(account)
      },
      (error) => { console.log(error) }
    )
  }

}


export default FeatureCtrl;
