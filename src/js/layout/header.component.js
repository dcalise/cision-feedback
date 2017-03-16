class AppHeaderCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';
    this.appName = AppConstants.appName;
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
