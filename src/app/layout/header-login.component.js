class AppHeaderLoginCtrl {
  constructor(AppConstants) {
    'ngInject';
    this.appName = AppConstants.appName;
  }
}

let AppHeaderLogin = {
  controller: AppHeaderLoginCtrl,
  templateUrl: 'layout/header-login.html'
};

export default AppHeaderLogin;
