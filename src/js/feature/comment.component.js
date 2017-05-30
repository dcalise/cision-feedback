class CommentCtrl {
  constructor() {
    'ngInject';

    // if (User.current) {
    //   this.canModify = (User.current.username === this.data.author.username);
    // } else {
    //   this.canModify = false;
    // }

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
