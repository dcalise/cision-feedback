export default class Comments {
  constructor($firebaseArray) {
    'ngInject';

    this._$firebaseArray = $firebaseArray;

    this._commentsRef = firebase.database().ref('comments');
    this._comments = $firebaseArray(this._commentsRef);

    this.all = this._comments;
  }

  forFeature(featureKey) {
    return this._$firebaseArray(this._commentsRef.child(featureKey))
  }
  
}