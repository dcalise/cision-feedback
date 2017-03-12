export default class Auth {
  constructor($firebaseAuth) {
    'ngInject';
    
    this._auth = $firebaseAuth;
    
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