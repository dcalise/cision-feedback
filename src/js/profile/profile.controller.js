class ProfileCtrl {
  constructor(md5, auth, profile, Users) {
    'ngInject';

    this._md5 = md5;
    this._auth = auth;
    this._profile = profile;
    this._Users = Users;

  }

  updateProfile() {
    this._profile.emailHash = this._md5.createHash(this._auth.email)
    this._profile.$save().then(
      // () => console.log(this._profile)
    )
  }

  signOut() {
    this._Users.signOut()
  }
}

export default ProfileCtrl;
