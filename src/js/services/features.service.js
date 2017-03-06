export default class Features {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
  }


  // Add Feature
  add(feature) {
    // console.log(feature.subject);
    // console.log(feature.account.name);
    return this._$http({
      url: `${this._AppConstants.api}/features`,
      method: 'POST',
      data: feature
    });
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

  // getFeature(id) {
  //   return this._$http({
  //     url: `${this._AppConstants.api}/features/${id}`,
  //     method: 'GET',
  //   }).then((res) => res);
  // }

  getAll() {
    return this._$http({
      url: `${this._AppConstants.api}/features`,
      method: 'GET',
    }).then((res) => res.data);

  }

}