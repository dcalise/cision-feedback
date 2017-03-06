export default class Features {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
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

  getAll() {
    return this._$http({
      url: `${this._AppConstants.api}/features`,
      method: 'GET',
    }).then((res) => res.data);

  }

  // destroy(commentId, articleSlug) {
  //   return this._$http({
  //     url: `${this._AppConstants.api}/articles/${articleSlug}/comments/${commentId}`,
  //     method: 'DELETE',
  //   });
  // }

}