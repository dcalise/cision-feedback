export default class Users {
  constructor($firebaseArray, $firebaseObject, Auth, $state) {
    'ngInject';

    this._$firebaseObject = $firebaseObject;
    this._$firebaseArray = $firebaseArray;
    this._Auth = Auth;
    this._$state = $state;

    this._usersRef = firebase.database().ref('users');
    this._users = $firebaseArray(this._usersRef);
    
    this.all = this._users;
    
  }

  getProfile(uid) {
    return this._$firebaseObject(this._usersRef.child(uid))
  }

  getDisplayName(uid) {
    return this._users.$getRecord(uid).displayName;
  }

  signOut() {
    this._Auth.$signOut().then(
      () => this._$state.go('app.login')
    );
  }
  
}