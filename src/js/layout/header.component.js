class AppHeaderCtrl {
  constructor(AppConstants, $scope, Auth, Users) {
    'ngInject';
    this.appName = AppConstants.appName;

    this._Users = Users;
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
