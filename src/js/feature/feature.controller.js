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
    this.showCustomerSummary = true

    this.listAccounts()

    this.getCommentMeta()

    // add existing accounts
    this.accountForm = {
      new: false
    }

    this.accountsMeta = []

    this.accountSelected = (selected) => {
      if (selected) {
        this.getAccountMeta(selected.originalObject.$id)
        return this.accountForm.selectedAccounts.push(selected.originalObject.$id)
      }
    }

    this.getAccountMeta = (accountId) => {
     return Accounts.getAccount(accountId).then(
       (account) => {
         this.accountsMeta.push(account)
       }
     )
    }

  }

  removeAccountFromAddList(i) {
    this.accountsMeta.splice(i,1)
    this.accountForm.selectedAccounts.splice(i,1)
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
          this.showComment = false
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

  resetAccountForm() {
    if (this.accountForm) {
      let sure = confirm('Are you sure you want to delete your draft?')
      if (sure == true ) {
        this.accountForm = {}
        this.showAccountForm = false
      }
    } else {
      this.showAccountForm = false
    }
  }

  addAccount() {
    if (this.accountForm.new === true) {
      this._Accounts.add(this.accountForm).then(
        (account) => {
          this._feature.accounts.push(account.key)

          return this._feature.$save().then(
            () => this.listAccounts(),
            (error) => console.log(error)
          )

        },
        (error) => { console.log(error) }
      )
    } else {
      this._feature.accounts = this._feature.accounts.concat(this.accountForm.selectedAccounts)
      return this._feature.$save().then(
        () => {
          this.listAccounts()
          this.accountsMeta = []
          this.accountForm.selectedAccounts = []
        },
        (error) => console.log(error)
      )
    }
  }

}


export default FeatureCtrl;
