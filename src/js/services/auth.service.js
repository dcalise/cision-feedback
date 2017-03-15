export default class Auth {
  constructor($firebaseAuth) {
    'ngInject';
    
    this.auth = $firebaseAuth();
    
  }
  
}