class ProfileCtrl {
  constructor(md5, auth, profile, UserService, toastr) {
    'ngInject';

    this._md5 = md5;
    this._auth = auth;
    this._profile = profile;
    this._UserService = UserService;
    this._toastr = toastr;

  }

  updateProfile() {
    this._profile.emailHash = this._md5.createHash(this._auth.email)
    this._profile.email = this._auth.email
    this._profile.$save().then(
      this._toastr.success('Profile saved')
    )
  }

  signOut() {
    this._UserService.signOut()
  }
}

export default ProfileCtrl;
