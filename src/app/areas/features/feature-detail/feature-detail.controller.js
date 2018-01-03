class FeatureDetailCtrl {
    constructor(
        feature,
        currentAuth,
        comments,
        profile,
        CommentService,
        FeatureService,
        AccountService,
        $stateParams,
        $state,
        UserService,
        $scope,
        toastr
    ) {
        'ngInject';

        this._$stateParams = $stateParams;

        this._$state = $state;
        this._$scope = $scope;

        this._feature = feature;
        this._currentAuth = currentAuth;
        this._comments = comments;

        if (profile.roles && profile.roles.admin === true) {
            this.userIsAdmin = true;
        }

        this._AccountService = AccountService;
        this._CommentService = CommentService;
        this._FeatureService = FeatureService;
        this._UserService = UserService;
        this._toastr = toastr;

        this._featureDetail = {};

        this.comment = {};
        this.comment.message = '';

        this.showOgRequest = true;
        this.showComments = true;
        this.showCustomerSummary = true;

        this.listAccounts();

        this.getCommentMeta();

        // reset account form
        $scope.resetExistingAccountForm = function() {
            if ($scope.reset) {
                $scope.reset.resetForm();
            }
        };
        $scope.setResetForm = function(reset) {
            $scope.reset = reset;
        };
    }

    archiveThisFeature() {
        let archiveAnswer = confirm(
            'Are you sure you want to archive this feature request?'
        );

        if (archiveAnswer) {
            this._feature.activeState = 1;
            this._feature.$save().then(() => {
                this._$state.go('app.feature-list');
                this._toastr.success(`"${this._feature.subject}" archived.`);
            }),
            err => console.log(err);
        }
    }

    deleteThisFeature() {
        let deleteAnswer = prompt('Please type DELETE to confirm this action.');

        if (deleteAnswer.toLowerCase() == 'delete') {
            this._feature.activeState = 0;
            this._feature.$save().then(() => {
                this._$state.go('app.feature-list');
                this._toastr.success(`"${this._feature.subject}" deleted.`);
            });
        } else {
            alert("You didn't type DELETE correctly. Please try again");
        }
    }

    listAccounts() {
        this._featureDetail.accountsMeta = [];
        this._featureDetail.totalValue = 0;
        angular.forEach(this._feature.accounts, accountObject => {
            this._AccountService
                .getAccount(accountObject.accountKey)
                .then(account => {
                    account.tie = accountObject.accountTie;
                    this._featureDetail.accountsMeta.push(account);
                    this._featureDetail.totalValue += parseInt(account.value);
                });
        });
        this._featureDetail.requester = this._UserService.getProfile(
            this._feature.requesterUID
        );
    }

    addComment() {
        if (this.comment.message.length > 0) {
            this._comments
                .$add({
                    message: this.comment.message,
                    dateCreated: Date.now(),
                    lastEdited: null,
                    author: this._currentAuth.uid
                })
                .then(
                    comments => {
                        this.getCommentMeta();
                        this.comment.message = '';
                        this.showComment = false;
                    },
                    error => console.log(error)
                );
        }
    }

    deleteComment(commentId, index) {
        this._comments.$remove(index);
    }

    getCommentMeta() {
        angular.forEach(this._comments, comment => {
            comment.authorMeta = this._UserService.getProfile(comment.author);
        });
    }

    resetComment() {
        if (this.comment.message.length > 0) {
            let sure = confirm('Are you sure you want to delete your draft?');
            if (sure == true) {
                this.comment.message = '';
                this.showComment = false;
            }
        } else {
            this.showComment = false;
        }
    }

    updateStatus() {
        return this._feature.$save();
    }

    addAccount() {
        if (this.newAccount === true) {
            this._AccountService.add(this.accountForm).then(
                account => {
                    let accountTieObject = {
                        accountKey: account.key,
                        accountTie: this.featureForm.accountTie
                    };
                    if (!this._feature.accounts) {
                        this._feature.accounts = [];
                    }
                    this._feature.accounts.push(accountTieObject);

                    return this._feature.$save().then(
                        () => {
                            this.listAccounts();
                            this.accountForm = {
                                selectedAccounts: []
                            };
                            this._$scope.resetExistingAccountForm();
                        },
                        error => console.log(error)
                    );
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            if (!this._feature.accounts) {
                this._feature.accounts = this.accountForm.selectedAccounts;
            } else {
                this._feature.accounts = this._feature.accounts.concat(
                    this.accountForm.selectedAccounts
                );
            }
            return this._feature.$save().then(
                () => {
                    this.listAccounts();
                    this.accountForm = {
                        selectedAccounts: []
                    };
                    this._$scope.resetExistingAccountForm();
                },
                error => console.log(error)
            );
        }
    }
}

export default FeatureDetailCtrl;
