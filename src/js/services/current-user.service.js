export default class CurrentUser {
  constructor(Auth) {
    'ngInject';

    Auth.$waitForSignIn().then(
      (auth) => {
        this.data = auth;
      }
    )
    Auth.$onAuthStateChanged(function(auth){
      if (auth) {
        CurrentUser.data = auth;
      } else {
        CurrentUser.data = null;
      }
    })
    console.error(CurrentUser.data)
  }
}