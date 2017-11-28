class AuthCtrl {
  constructor(AuthService, $state) {
    'ngInject'

    this._$state = $state
    this._AuthService = AuthService
   
    this.error = null
  }

  submitLogin() {
    this.isSubmitting = true
    this._AuthService.$signInWithEmailAndPassword(this.formData.email, this.formData.password).then(
      (res) => {
        this.isSubmitting = false
        this._$state.go('app.home')
      },
      (err) => {
        console.log(err)
        this.isSubmitting = false
        this.error = err
      }
    )
  }
  submitRegister() {
    let domain = this.formData.email.split('@')[1];
    if (domain === 'prnewswire.com' || domain === 'cision.com' || domain === 'prnewswire.co.uk' || domain === 'multivu.com' || domain === 'gorkana.com' || domain === 'newswire.ca') {
      this.isSubmitting = true
      this._AuthService.$createUserWithEmailAndPassword(this.formData.email, this.formData.password).then(
        (res) => {
          this.isSubmitting = false
          this._$state.go('app.profile')
        },
        (err) => {
          this.isSubmitting = false
          this.error = err
        }
      )
    } else {
      this.error.message = "Sorry, you can't register with that email address. Please contact the administrator for for information."
    }
  }

  resetPassword() {
    this._AuthService.$sendPasswordResetEmail(this.formData.email).then(
      () => {
        let email = this.formData.email
        this.formData.email = ''
        this.error = null
        this.info = `A password reset email has been sent to ${ email }.`
      },
      (err) => {
        this.error = err
        this.info = null
      }
    )
  }
}


export default AuthCtrl
