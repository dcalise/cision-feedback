class AppFooterCtrl {
  constructor(AppConstants) {
    'ngInject';
    this.appName = AppConstants.appName;
    this.githubURL = AppConstants.githubURL
    this.adminEmail = AppConstants.adminEmail

    // Get today's date to generate the year
    this.date = new Date();
  }
}

let AppFooter = {
  controller: AppFooterCtrl,
  templateUrl: 'layout/footer.html'
};

export default AppFooter;
