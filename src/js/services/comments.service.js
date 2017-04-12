export default class Comments {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this._$firebaseObject = $firebaseObject;
    this._$firebaseArray = $firebaseArray;

    this._commentsRef = firebase.database().ref('comments');
    this._comments = $firebaseArray(this._commentsRef);

    this.all = this._comments;
  }

  add(currentAuth, comment, featureKey) {
    return this._comments.$add({
      message: comment.message,
      dateCreated: Date.now(),
      lastEdited: null,
      author: currentAuth.uid,
      feature: featureKey
    })
  }

  forFeature(featureKey) {
    return this._$firebaseObject(this._commentsRef.child(featureKey))
  }
}