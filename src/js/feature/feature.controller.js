class FeatureCtrl {
  constructor(feature, Features, Accounts, $stateParams, Users) {
    'ngInject';

    this._$stateParams = $stateParams;

    this._feature = feature;
    this._Accounts = Accounts;
    this._Features = Features;
    this._Users = Users;

    this._featureDetail = {}

  }
  listAccounts() {
    this._featureDetail.accountsMeta = []
    this._featureDetail.totalValue = 0
    angular.forEach(this._feature.accounts, (account) => {
      this._Accounts.getAccount(account).then(
        (account) => {
          this._featureDetail.accountsMeta.push(account)
          this._featureDetail.totalValue += parseInt(account.value)
        }
      )
    })
    this._featureDetail.requester = this._Users.getProfile(this._feature.requesterUID);
  }

  addAccount() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        console.log(account.key)
        this._feature.accounts.push(account.key)

        return this._feature.$save().then(
          () => this.listAccounts(),
          (error) => console.log(error)
        )

      },
      (error) => { console.log(error) }
    )
  }

}


export default FeatureCtrl;
