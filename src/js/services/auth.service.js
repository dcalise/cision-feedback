export default class Auth {
  constructor($firebaseAuth, $state) {
    'ngInject';
    
    this._$firebaseAuth = $firebaseAuth;
    this._$state = $state;
    
  }

  login(creds) {
    console.log(creds);
    // Auth.$signInWithEmailAndPassword(email, password).then(function (auth){
    //   this._$state.go('home');
    // }, function (error){
    //   authCtrl.error = error;
    // });
  }

  register(creds) {
    console.log(creds);
    this._$firebaseAuth.$signInWithEmailAndPassword(creds.email, creds.password)
    .then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // login() {
  //   Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (_$auth){
  //     $state.go('home');
  //   }, function (error){
  //     authCtrl.error = error;
  //   });
  // };

  // // should this be called Auth?
  // register() {
  //   Auth.$createUserWithEmailAndPassword(Auth.user.email, Auth.user.password).then(function (user){
  //     $state.go('home');
  //   }, function (error){
  //     Auth.error = error;
  //   });
  // };

  
}