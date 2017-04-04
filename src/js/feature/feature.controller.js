class FeatureCtrl {
  constructor(Features, Accounts, $stateParams, Users) {
    'ngInject';

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
}


export default FeatureCtrl;
