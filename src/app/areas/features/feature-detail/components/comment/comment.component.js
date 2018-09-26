class CommentCtrl {
    constructor(AuthService) {
        'ngInject';

        AuthService.$requireSignIn().then(
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
    templateUrl: 'areas/features/feature-detail/components/comment/comment.html'
};

export default Comment;
