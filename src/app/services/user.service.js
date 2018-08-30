export default class UserService {
    constructor($firebaseArray, $firebaseObject, AuthService, $state, toastr) {
        'ngInject';

        this._$firebaseObject = $firebaseObject;
        this._$firebaseArray = $firebaseArray;
        this._AuthService = AuthService;
        this._$state = $state;
        this._toastr = toastr;

        this._usersRef = firebase.database().ref('users');
        this._users = $firebaseArray(this._usersRef);

        
        this.all = this._users;
        
        this.admin = false;
        AuthService.$requireSignIn().then(auth => {
            this.getProfile(auth.uid)
            .$loaded()
            .then(profile => {
                if (profile.roles && profile.roles.admin === true) {
                    this.admin = true;
                }
            });
        });
    }

    getProfile(uid) {
        return this._$firebaseObject(this._usersRef.child(uid));
    }

    getDisplayName(uid) {
        return this._users.$getRecord(uid).displayName;
    }

    signOut() {
        this._AuthService.$signOut().then(() => this._$state.go('app.login'));
    }

    sendFirebaseEmailVerification() {
        let user = firebase.auth().currentUser;
        user
            .sendEmailVerification()
            .then(success => {
                this._toastr.success('Verification email sent.')
            })
            .catch(err => {
                this.error = err;
            });
    }
}
