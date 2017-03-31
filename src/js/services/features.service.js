export default class Features {
  constructor($firebaseArray, $firebaseObject, AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


    this._featuresRef = firebase.database().ref('features');
    this._features = $firebaseArray(this._featuresRef);

    this.all = this._features;
  }


  // Add Feature
  add(feature, currentAuth, profile) {
    return this._features.$add({
      subject: feature.subject,
      description: feature.description,
      accounts: [{
        name: feature.account.name,
        accountType: feature.account.accountType,
        id: feature.account.id,
        value: feature.account.value
      }],
      requesterUID: currentAuth.uid,
      status: 'New',
      dateCreated: Date.now(),
      lastUpdated: null,
      editedBy: null
    })
  }

  getFeature(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Feature slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.api + '/features/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data[0]),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

}