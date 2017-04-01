export default class Auth {
  constructor($firebaseAuth) {
    'ngInject';

    const auth = $firebaseAuth();
    
    return auth;
  }
  
}