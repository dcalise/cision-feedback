class ProfileCtrl {
  constructor(md5, auth, profile, Users, toastr) {
    'ngInject';

    this._md5 = md5;
    this._auth = auth;
    this._profile = profile;
    this._Users = Users;
    this._toastr = toastr;

  }

  updateProfile() {
    this._profile.emailHash = this._md5.createHash(this._auth.email)
    this._profile.$save().then(
      this._toastr.success('Profile saved')
    )
  }

  signOut() {
    this._Users.signOut()
  }
}

export default ProfileCtrl;
