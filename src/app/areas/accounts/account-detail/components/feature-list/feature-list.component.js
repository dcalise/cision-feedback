class FeatureListCtrl {
    constructor(AccountService, FeatureService) {
        'ngInject';

        this._AccountService = AccountService;
        this._FeatureService = FeatureService;
    }

    $onInit() {
      this.listFeatures();
    }

    listFeatures() {
        this.featureDetails = [];
        this.features.forEach(featureObject => {
            this._FeatureService
                .getFeature(featureObject.featureKey)
                .$loaded()
                .then(feature => {
                    feature.featureTie = featureObject.featureTie;
                    this.featureDetails.push(feature);
                });
        });
    }

    removeFeatureFromAccount(featureId) {
        let removeConfirmation = confirm(
            'Are you sure you want to remove this account from this request?'
        );

        if (removeConfirmation) {
            this._FeatureService
                .removeAccountFromFeature(this.accountId, featureId)
                .then(() => {
                    this._FeatureService.updateTotalAndAverageValue(featureId);
                    this.listFeatures();
                });
        }
    }
}

let FeatureList = {
    bindings: {
        admin: '<',
        features: '=',
        accountId: '<'
    },
    controller: FeatureListCtrl,
    templateUrl:
        'areas/accounts/account-detail/components/feature-list/feature-list.html'
};

export default FeatureList;
