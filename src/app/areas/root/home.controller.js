class HomeCtrl {
    constructor(AppConstants, profile) {
        'ngInject';
        this.appName = AppConstants.appName
        this._profile = profile;
    }

    $onInit() {
        this.showMostValuableFeatures = true;
        this.showFeaturesByStatus = true;
    }
}

export default HomeCtrl;
