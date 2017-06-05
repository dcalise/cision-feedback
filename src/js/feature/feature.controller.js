class FeatureCtrl {
  constructor(feature, currentAuth, comments, profile, Comments, Features, Accounts, $stateParams, $state, Users, $scope) {
    'ngInject';

    this._$stateParams = $stateParams
    
    this._$state = $state
    this._$scope = $scope

    this._feature = feature
    this._currentAuth = currentAuth
    this._comments = comments
    
    if (profile.roles && profile.roles.admin === true) {
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

    // reset account form
    $scope.resetExistingAccountForm = function() {
      if($scope.reset) $scope.reset.resetForm();
    }
    $scope.setResetForm = function(reset){
      $scope.reset = reset;
    };

  }

  listAccounts() {
    this._featureDetail.accountsMeta = []
    this._featureDetail.totalValue = 0
    angular.forEach(this._feature.accounts, (accountObject) => {
      this._Accounts.getAccount(accountObject.accountKey).then(
        (account) => {
          account.tie = accountObject.accountTie
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

  deleteComment(commentId, index) {
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

  updateStatus() {
    return this._feature.$save()
  }

  addAccount() {
    if (this.newAccount === true) {
      this._Accounts.add(this.accountForm).then(
        (account) => {
          let accountTieObject = {
            accountKey: account.key,
            accountTie: this.featureForm.accountTie
          }
          if (!this._feature.accounts) {
            this._feature.accounts = []
          }
          this._feature.accounts.push(accountTieObject)

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
          this.accountForm = {
            selectedAccounts: []
          }
          this._$scope.resetExistingAccountForm()
        },
        (error) => console.log(error)
      )
    }
  }

}


export default FeatureCtrl;
