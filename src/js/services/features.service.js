export default class Features {
  constructor($firebaseArray, $firebaseObject, AppConstants, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$q = $q;
    this._$firebaseObject = $firebaseObject;

    this._featuresRef = firebase.database().ref('features');
    this._features = $firebaseArray(this._featuresRef);

    this.all = this._features;
  }


  addAccountToFeature(account, uid) {
    return this.getFeature(uid).then(
      (feature) => {
        feature.accounts.push(account)
        return feature;
      }
    )
  }

  // Add Feature
  add(feature, currentAuth, profile, accountKey) {
    if (!Array.isArray(accountKey)) {
      accountKey = [accountKey]
    }
    return this._features.$add({
      accounts: accountKey,
      description: feature.description,
      subject: feature.subject,
      requesterUID: currentAuth.uid,
      status: 'New',
      labels: feature.labels || null,
      compGap: feature.compGap || null,
      legacyGap: feature.legacyGap,
      dateCreated: Date.now(),
      lastUpdated: null,
      editedBy: null
    })
  }
  getFeature(slug) {
    return this._$firebaseObject(this._featuresRef.child(slug))
  }

}