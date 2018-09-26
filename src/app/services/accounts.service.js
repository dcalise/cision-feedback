export default class AccountService {
    constructor($firebaseArray, $firebaseObject) {
        'ngInject';

        this._$firebaseObject = $firebaseObject;

        this.accountsRef = firebase.database().ref('accounts');
        this.accounts = $firebaseArray(this.accountsRef);

        this.all = this.accounts;
    }

    add(account) {
        account.value = account.value.replace(/[^0-9.]/g, '');
        return this.accounts.$add({
            platform: account.platform || null,
            name: account.name,
            accountType: account.accountType,
            salesForceUrl: account.salesForceUrl || null,
            cid: account.cid || null,
            country: account.country || null,
            value: account.value || null,
            customerNotes: account.customerNotes || null,
            dateCreated: Date.now(),
            lastUpdated: null,
            editedBy: null
        })
    }

    getAccount(accountKey) {
        return this.accounts.$loaded().then(accounts => {
            return accounts.$getRecord(accountKey);
        });
    }

    getAccountWithPromise(accountKey) {
        return this._$firebaseObject(this.accountsRef.child(accountKey));
    }

    accountSearch(str, accounts) {
        var matches = [];
        accounts.forEach(function (account) {
            let name = account.name ? account.name.toLowerCase() : '';
            let id = account.cid ? account.cid.toLowerCase() : '';
            if (
                name.indexOf(str.toString().toLowerCase()) >= 0 ||
                id.indexOf(str.toString().toLowerCase()) >= 0
            ) {
                matches.push(account);
            }
        });
        return matches;
    }
}
