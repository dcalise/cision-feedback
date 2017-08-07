class AdminCtrl {
  constructor(currentAuth, profile, AuthService, UserService, LabelService) {
    'ngInject';

    this._profile = profile;
    
    this.admin = false;
    AuthService.$requireSignIn().then(
      (auth) => {
        UserService.getProfile(auth.uid).$loaded().then(
          (profile) => {
            if (profile.roles && profile.roles.admin === true) {
              this.admin = true;
            }
          }
        )
      }
    )

    this._LabelService = LabelService;

  }

  addLabel(name) {
    console.log(name);
  }

}

export default AdminCtrl;
