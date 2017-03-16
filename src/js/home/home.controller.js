class HomeCtrl {
  constructor(AppConstants, currentAuth) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._currentAuth = currentAuth;
  }


}

export default HomeCtrl;
