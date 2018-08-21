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
    add(feature, currentAuth, accountKey) {
        if (!Array.isArray(accountKey)) {
            accountKey = [accountKey];
        }
        if (!Array.isArray(feature.labels)) {
            feature.labels = [feature.labels];
        }
        return this._features.$add({
            accounts: accountKey,
            description: feature.description || null,
            subject: feature.subject,
            requesterUID: currentAuth.uid,
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
    getFeature(slug) {
        return this._$firebaseObject(this._featuresRef.child(slug));
    }

    updateTotalAndAverageValue(uid) {
        return this.getFeature(uid)
            .$loaded().then(
                feature => {
                    let totalValue = 0;
                    // let defer = $q.defer();
                    if (feature.accounts) {
                        let promises = [];
                        let accountsWithValue = 0;
                        feature.accounts.forEach((account) => {
                            promises.push(this._AccountService.getAccount(account.accountKey))
                        })
                        this._$q.all(promises).then(accounts => {
                            accounts.forEach(account => {
                                if (account.value) {
                                    accountsWithValue++;
                                    totalValue += parseInt(account.value);
                                }
                            });
                            feature.totalValue = totalValue
                            feature.averageValue = totalValue / accountsWithValue;
                            feature.$save();
                        })
                    }
                    // angular.forEach(feature.accounts, account => {
                    //     this._AccountService
                    //         .getAccount(account.accountKey)
                    //         .then(curAccount => {
                    //             feature.totalValue += parseInt(curAccount.value);
                    //         });
                    // });
                    // feature.$save().then(
                    //     res => console.log(res.key), err => console.log(err)
                    // )
                    // return feature.totalValue;
                }
            )
    }   
}
