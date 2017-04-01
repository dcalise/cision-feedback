export default class Accounts {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this.accountsRef = firebase.database().ref('accounts');
    this.accounts = $firebaseArray(this.accountsRef);

    this.all = this.accounts;
  }

  add(account) {
    return this.accounts.$add({
      name: account.name,
      accountType: account.accountType,
      cid: account.cid,
      // country: account.country,
      value: account.value,
      dateCreated: Date.now(),
      lastUpdated: null,
      editedBy: null
    })
  }
}