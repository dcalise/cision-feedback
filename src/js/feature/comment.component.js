class CommentCtrl {
  constructor(Auth) {
    'ngInject';

    Auth.$requireSignIn().then(
      (auth) => {
        if (auth.uid) {
          this.canModify = (auth.uid === this.data.author)
        } else {
          this.canModify = false;
        }
      }
    )

  }
}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'feature/comment.html'
};

export default Comment;
