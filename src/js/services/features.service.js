export default class Features {
  constructor($firebaseArray, $firebaseObject, AppConstants, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$q = $q;


    this._featuresRef = firebase.database().ref('features');
    this._features = $firebaseArray(this._featuresRef);

    this.all = this._features;
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
    return this._features.$loaded().then(
      (features) => {
        return features.$getRecord(slug)
      }
    )
  }

}