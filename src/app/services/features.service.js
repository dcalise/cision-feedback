export default class FeatureService {
    constructor($firebaseArray, $firebaseObject, AccountService, $q) {
        'ngInject';

        this._$firebaseObject = $firebaseObject;

        this._featuresRef = firebase.database().ref('features');
        this._features = $firebaseArray(this._featuresRef);

        this._AccountService = AccountService;

        this._$q = $q;

        this.all = this._features;
    }

    addAccountToFeature(account, uid) {
        return this.getFeature(uid).then(feature => {
            feature.accounts.push(account);
            this.updateTotalAndAverageValue(uid);
            return feature;
        });
    }

    removeAccountFromFeature(accountId, uid) {
        return this.getFeature(uid)
            .$loaded()
            .then(feature => {
                let i;
                feature.accounts.forEach((account, index) => {
                    if (account.accountKey === accountId) {
                        i = index;
                    }
                });
                if (i > -1) {
                    feature.accounts.splice(i, 1);
                    feature.$save().then(
                        feature => {
                            return feature;
                        },
                        err => console.log(err)
                    );
                }
            });
    }

    // Add Feature
    add(feature, currentAuth, accounts) {
        if (!Array.isArray(accounts)) {
            accounts = [accounts];
        }
        if (!Array.isArray(feature.labels)) {
            feature.labels = [feature.labels];
        }
        if (accounts.length > 0) {
            return this.getOriginalRequesterName(accounts[0].accountKey)
                .then(accountName => {
                    return this._features.$add({
                        accounts: accounts,
                        description: feature.description || null,
                        subject: feature.subject,
                        requesterUID: currentAuth.uid,
                        originalRequester: accountName,
                        status: 'Received',
                        location: feature.location || null,
                        labels: feature.labels || null,
                        dateCreated: Date.now(),
                        activeState: 2,
                        events: {
                            lastUpdated: null,
                            viewedBy: null,
                            editedBy: null
                        }
                    });
                });
        } else {
            return this._features.$add({
                accounts: accounts,
                description: feature.description || null,
                subject: feature.subject,
                requesterUID: currentAuth.uid,
                originalRequester: null,
                status: 'Received',
                location: feature.location || null,
                labels: feature.labels || null,
                dateCreated: Date.now(),
                activeState: 2,
                events: {
                    lastUpdated: null,
                    viewedBy: null,
                    editedBy: null
                }
            });
        }
    }
    getFeature(slug) {
        return this._$firebaseObject(this._featuresRef.child(slug));
    }

    getOriginalRequesterName(id) {
        let defer = this._$q.defer();
        this._AccountService
            .getAccountWithPromise(id)
            .$loaded()
            .then(account => {
                defer.resolve(account.name);
            });
        return defer.promise;
    }

    updateTotalAndAverageValue(uid) {
        return this.getFeature(uid)
            .$loaded()
            .then(feature => {
                let totalValue = 0;
                if (feature.accounts) {
                    let promises = [];
                    let accountsWithValue = 0;
                    feature.accounts.forEach(account => {
                        promises.push(
                            this._AccountService.getAccount(account.accountKey)
                        );
                    });
                    this._$q.all(promises).then(accounts => {
                        accounts.forEach(account => {
                            if (account.value) {
                                accountsWithValue++;
                                totalValue += parseInt(account.value);
                            }
                        });
                        feature.totalValue = totalValue;
                        feature.averageValue = totalValue / accountsWithValue;
                        feature.$save();
                    });
                } else if (feature.totalValue || feature.averageValue) {
                    feature.totalValue = 0;
                    feature.averageValue = 0;
                    feature.$save();
                }
            });
    }

    updateOriginalRequesterName(id) {
        this.getFeature(id).$loaded().then(
            feature => {
                if (feature.accounts.length > 0) {
                    console.log(typeof feature.accounts);
                    this.getOriginalRequesterName(feature.accounts[0].accountKey).then(
                        accountName => {
                            feature.originalRequester = accountName;
                            feature.$save();
                        }
                    );
                }
            }
        )
    }
}
