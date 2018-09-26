class HomeCtrl {
    constructor(AppConstants, currentAuth, profile) {
        'ngInject';
        this.appName = AppConstants.appName
        this._profile = profile;
    }


}

export default HomeCtrl;
