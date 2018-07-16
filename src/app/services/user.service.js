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

                    this.initializePendo(auth.uid, profile);
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
        user.sendEmailVerification()
            .then(success => {
                this._toastr.success('Verification email sent.');
            })
            .catch(err => {
                this.error = err;
            });
    }

    initializePendo(uid, profile) {
        (function(apiKey) {
            (function(p, e, n, d, o) {
                var v, w, x, y, z;
                o = p[d] = p[d] || {};
                o._q = [];
                v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
                for (w = 0, x = v.length; w < x; ++w) {
                    (function(m) {
                        o[m] =
                            o[m] ||
                            function() {
                                o._q[m === v[0] ? 'unshift' : 'push'](
                                    [m].concat([].slice.call(arguments, 0))
                                );
                            };
                    })(v[w]);
                }
                y = e.createElement(n);
                y.async = !0;
                y.src =
                    'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
                z = e.getElementsByTagName(n)[0];
                z.parentNode.insertBefore(y, z);
            })(window, document, 'script', 'pendo');

            pendo.initialize({
                visitor: {
                    id: uid,
                    email: profile.email,
                    role: profile.department
                }
            });
        })('b44f0ecf-aa2c-4aa9-68ed-c8d1fab5e8dd');
    }
}
