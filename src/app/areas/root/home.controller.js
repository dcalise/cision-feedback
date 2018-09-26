class HomeCtrl {
    constructor(AppConstants, profile) {
        'ngInject';
        this.appName = AppConstants.appName
        this._profile = profile;
    }
}

export default HomeCtrl;
