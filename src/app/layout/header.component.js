class AppHeaderCtrl {
    constructor(AppConstants, AuthService) {
        'ngInject';
        this.appName = AppConstants.appNam;
        this._AuthService = AuthService;
    }

    $onInit() {

        const authData = this._AuthService.$getAuth();
        if (authData) {
            this.authorized = true;
            if (authData.emailVerified) {
                this.emailVerified = true;
            }
        }
    }
}

let AppHeader = {
    controller: AppHeaderCtrl,
    templateUrl: 'layout/header.html'
};

export default AppHeader;
