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
    return this._features.$add({
      subject: feature.subject,
      description: feature.description,
      accounts: [accountKey],
      requesterUID: currentAuth.uid,
      status: 'New',
      dateCreated: Date.now(),
      lastUpdated: null,
      editedBy: null
    })
  }
  getFeature(slug) {
    return this._$firebaseObject(this._featuresRef.child(slug))
  }

}