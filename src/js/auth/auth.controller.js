class AuthCtrl {
  constructor(Auth, $state) {
    'ngInject';

    this._Auth = Auth;
    this.$state = $state;
   
  }

  submitLogin() {
    this.isSubmitting = true;
    this._Auth.login(this.formData).then(
      (res) => {
        this.isSubmitting = false;
        console.log('test');
      },
      (err) => {
        this.isSubmitting = false;
        console.log(err);
      }
    )
  }

  submitRegister() {
    this.isSubmitting = true;
    this._Auth.register(this.formData)
      // .then(
      //   (res) => {
      //     this.isSubmitting = false;
      //     console.log('test');
      //   },
      //   (err) => {
      //     this.isSubmitting = false;
      //     console.log(err);
      //   }
      // )
  }
}


export default AuthCtrl;
