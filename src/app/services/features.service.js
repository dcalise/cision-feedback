export default class FeatureService {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

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
      description: feature.description || null,
      subject: feature.subject,
      requesterUID: currentAuth.uid,
      status: 'Received',
      compGap: feature.compGap || null,
      legacyGap: feature.legacyGap || null,
      product: feature.product,
      location: feature.location || null,
      labels: feature.labels || null,
      dateCreated: Date.now(),
      events: {
        lastUpdated: null,
        viewedBy: null,
        editedBy: null
      }
    })
  }
  getFeature(slug) {
    return this._$firebaseObject(this._featuresRef.child(slug))
  }

}