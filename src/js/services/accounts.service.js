export default class Accounts {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this.accountsRef = firebase.database().ref('accounts');
    this.accounts = $firebaseArray(this.accountsRef);

    this.all = this.accounts;
  }

  add(account) {
    return this.accounts.$add({
      platform: account.platform,
      priorPlatform: account.priorPlatform,
      name: account.name,
      accountType: account.accountType,
      cid: account.cid,
      country: account.country,
      value: account.value,
      dateCreated: Date.now(),
      lastUpdated: null,
      editedBy: null
    })
  }

  getAccount(accountKey) {
    return this.accounts.$loaded().then(
      (accounts) => {
        return accounts.$getRecord(accountKey)
      }
    )
  }

  accountSearch(str, accounts) {
    var matches = [];
    accounts.forEach(function(account) {
      if (account.name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0 || account.cid.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
        matches.push(account);
      }
    });
    return matches;
  };
}