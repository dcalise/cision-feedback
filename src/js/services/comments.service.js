export default class Comments {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this._$firebaseObject = $firebaseObject;

    this._commentsRef = fiebase.database().ref('comments');
    this._commments = $firebaseArray(this._commentsRef);

    this.all = this._comments;
  }

  add(feature, currentAuth, profile, comment) {
    return this._comments.$add({
      message: comment.message,
      dateCreated: Date.now(),
      lastEdited: null,
      author: currentAuth.uid
    })
  }
}