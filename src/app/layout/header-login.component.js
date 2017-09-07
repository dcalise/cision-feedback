class AppHeaderLoginCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';
    this.appName = AppConstants.appName;
  }
}

let AppHeaderLogin = {
  controller: AppHeaderLoginCtrl,
  templateUrl: 'layout/header-login.html'
};

export default AppHeaderLogin;
