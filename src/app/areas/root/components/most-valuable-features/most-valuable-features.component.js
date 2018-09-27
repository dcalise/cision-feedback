class MostValuableFeaturesCtrl {
    constructor(FeatureService, $firebaseArray) {
        'ngInject';

        this._FeatureService = FeatureService;
        this.$firebaseArray = $firebaseArray;

    }

    $onInit() {
        this.data = this.$firebaseArray(this._FeatureService._featuresRef.orderByChild('totalValue').limitToLast(8));

        this.data.$loaded().then(
            data => this.data = data.reverse()
        );
    }
}

let MostValuableFeatures = {
    controller: MostValuableFeaturesCtrl,
    templateUrl: 'areas/root/components/most-valuable-features/most-valuable-features.html'
}

export default MostValuableFeatures;
