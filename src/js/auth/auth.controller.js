class AuthCtrl {
  constructor(Auth, $state) {
    'ngInject';

    this._$state = $state;
    this._Auth = Auth;
   
    this.error = {};
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
    let domain = this.formData.email.split('@')[1];
    if (domain === 'prnewswire.com' || domain === 'cision.com' || domain === 'prnewswire.co.uk' || domain === 'multivu.com' || domain === 'gorkana.com') {
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
    } else {
      this.error.message = "Sorry, you can't register with that email address. Please contact the administrator for for information."
    }

  }
}


export default AuthCtrl;
