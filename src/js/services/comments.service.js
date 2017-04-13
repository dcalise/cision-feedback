export default class Comments {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this._$firebaseObject = $firebaseObject;
    this._$firebaseArray = $firebaseArray;

    this._commentsRef = firebase.database().ref('comments');
    this._comments = $firebaseArray(this._commentsRef);

    this.all = this._comments;
  }

  forFeature(featureKey) {
    return this._$firebaseArray(this._commentsRef.child(featureKey))
  }
  
}