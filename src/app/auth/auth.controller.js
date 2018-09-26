class AuthCtrl {
    constructor(AuthService, UserService, $state) {
        'ngInject';

        this._$state = $state;
        this._AuthService = AuthService;
        this._UserService = UserService;

        this.error = null;
    }

    submitLogin() {
        this.isSubmitting = true;
        this._AuthService
            .$signInWithEmailAndPassword(
                this.formData.email,
                this.formData.password
            )
            .then(
                () => {
                    this.isSubmitting = false;
                    this._$state.go('app.home');
                },
                err => {
                    console.log(err);
                    this.isSubmitting = false;
                    this.error = err;
                }
            );
    }
    submitRegister() {
        this.isSubmitting = true;
        this._AuthService
            .$createUserWithEmailAndPassword(
                this.formData.email,
                this.formData.password
            )
            .then(
                () => {
                    this.isSubmitting = false;
                    this._UserService.sendFirebaseEmailVerification();
                    this._$state.go('app.profile');
                },
                err => {
                    this.isSubmitting = false;
                    this.error = err;
                }
            );
    }

    resetPassword() {
        this._AuthService.$sendPasswordResetEmail(this.formData.email).then(
            () => {
                let email = this.formData.email;
                this.formData.email = '';
                this.error = null;
                this.info = `A password reset email has been sent to ${email}.`;
            },
            err => {
                this.error = err;
                this.info = null;
            }
        );
    }
}

export default AuthCtrl;
