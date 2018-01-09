class ProfileCtrl {
    constructor(md5, currentAuth, profile, UserService, toastr) {
        'ngInject';

        this._md5 = md5;
        this._currentAuth = currentAuth;
        this._profile = profile;
        this._UserService = UserService;
        this._toastr = toastr;

        console.log(currentAuth)
    }

    updateProfile() {
        this._profile.emailHash = this._md5.createHash(this._currentAuth.email);
        this._profile.email = this._currentAuth.email;
        this._profile.$save().then(this._toastr.success('Profile saved'));
    }

    signOut() {
        this._UserService.signOut();
    }
}

export default ProfileCtrl;
