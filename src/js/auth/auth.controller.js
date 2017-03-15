class AuthCtrl {
  constructor(Auth, $state) {
    'ngInject';

    this._Auth = Auth.auth;
    this._$state = $state;
    console.log(Auth);

    this.user = {
      email: '',
      password: ''
    }
   
  }

  submitLogin() {
    this.isSubmitting = true;
    this._Auth.$signInWithEmailAndPassword(this.formData.email, this.formData.password).then(
      (res) => {
        this.isSubmitting = false;
        this._$state.go('app.home')
      },
      (err) => {
        this.isSubmitting = false;
        this.error = err;
      }
    )
  }
  submitRegister() {
    this.isSubmitting = true;
    this._Auth.$createUserWithEmailAndPassword(this.formData.email, this.formData.password).then(
      (res) => {
        this.isSubmitting = false;
        this._$state.go('app.home')
      },
      (err) => {
        this.isSubmitting = false;
        this.error = err;
      }
    )
  }
}


export default AuthCtrl;
