class FeatureCtrl {
  constructor(feature, currentAuth, comments, profile, Comments, Features, Accounts, $stateParams, $state, Users) {
    'ngInject';

    this._$stateParams = $stateParams
    
    this._$state = $state;

    this._feature = feature
    this._currentAuth = currentAuth
    this._comments = comments
    
    if (profile.roles.admin === true) {
      this.userIsAdmin = true
    }

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
    this.new = false

    this.existingAccountsMeta = []

    this.accountSelected = (selected) => {
      if (selected) {
        this.getAccountMeta(selected.originalObject.$id)
        return this.accountForm.selectedAccounts.push(selected.originalObject.$id)
      }
    }

    this.getAccountMeta = (accountId) => {
     return Accounts.getAccount(accountId).then(
       (account) => {
         this.existingAccountsMeta.push(account)
       }
     )
    }

  }

  removeAccountFromAddList(i) {
    this.existingAccountsMeta.splice(i,1)
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
    this._featureDetail.requester = this._Users.getProfile(this._feature.requesterUID)
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

  deleteComment(commentId, index) {\
    this._comments.$remove(index)
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

  resetAccountForm(added) {
    if (this.accountForm.name || this.accountForm.cid || this.accountForm.selectedAccounts.length > 0) {
      let sure;
      if (!added) {
        sure = confirm('Are you sure you want to delete your draft?')
      }
      if (sure || added) {
        this.accountForm = {}
        this.showAccountForm = false
        this.existingAccountsMeta = []
        this.accountForm.selectedAccounts = []
      }
    } else {
      this.showAccountForm = false
    }
  }

  addAccount() {
    if (this.new === true) {
      this._Accounts.add(this.accountForm).then(
        (account) => {
          if (!this._feature.accounts) {
            this._feature.accounts = []
          }
          this._feature.accounts.push(account.key)

          return this._feature.$save().then(
            () => {
              this.listAccounts()
              this.resetAccountForm(true)
            },
            (error) => console.log(error)
          )

        },
        (error) => { console.log(error) }
      )
    } else {
      if (!this._feature.accounts) { 
        this._feature.accounts = this.accountForm.selectedAccounts
      } else {
        this._feature.accounts = this._feature.accounts.concat(this.accountForm.selectedAccounts)
      }
      return this._feature.$save().then(
        () => {
          this.listAccounts()
          // reset add existing
          this.existingAccountsMeta = []
          // reset form
          this.accountForm = {}
          this.showAccountForm = false
        },
        (error) => console.log(error)
      )
    }
  }

}


export default FeatureCtrl;
