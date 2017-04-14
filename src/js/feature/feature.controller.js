class FeatureCtrl {
  constructor(feature, currentAuth, comments, Comments, Features, Accounts, $stateParams, Users) {
    'ngInject';

    this._$stateParams = $stateParams

    this._feature = feature
    this._currentAuth = currentAuth
    this._comments = comments

    // console.log(this._comments)
    this._Accounts = Accounts
    this._Comments = Comments
    this._Features = Features
    this._Users = Users

    this._featureDetail = {}

    this.comment = {}
    this.comment.message = ''
    
    this.showOgRequest = true
    this.showComments = true

    this.listAccounts()

    this.getCommentMeta()

  }


  listAccounts() {
    this._featureDetail.accountsMeta = []
    this._featureDetail.totalValue = 0
    angular.forEach(this._feature.accounts, (account) => {
      this._Accounts.getAccount(account).then(
        (account) => {
          this._featureDetail.accountsMeta.push(account)
          this._featureDetail.totalValue += parseInt(account.value)
        }
      )
    })
    this._featureDetail.requester = this._Users.getProfile(this._feature.requesterUID);
  }

  addComment() {
    if (this.comment.message.length > 0) {

      this._comments.$add({
        message: this.comment.message,
        dateCreated: Date.now(),
        lastEdited: null,
        author: this._currentAuth.uid,
      }).then(
        (comments) => {
          this.getCommentMeta()
          this.comment.message = ''
        },
        (error) => console.log(error)
      ) 
    }
  }

  getCommentMeta() {
    angular.forEach(this._comments, (comment) => {
      comment.authorMeta = this._Users.getProfile(comment.author);
    })
  }

  resetComment() {
    if (this.comment.message.length > 0) {
      let sure = confirm('Are you sure you want to delete your draft?')
      if (sure == true ) {
        this.comment.message = '';
        this.showComment = false;
      }
    } else {
      this.showComment = false;
    }
  }

  addAccount() {
    this._Accounts.add(this.accountForm).then(
      (account) => {
        console.log(account.key)
        this._feature.accounts.push(account.key)

        return this._feature.$save().then(
          () => this.listAccounts(),
          (error) => console.log(error)
        )

      },
      (error) => { console.log(error) }
    )
  }

}


export default FeatureCtrl;
