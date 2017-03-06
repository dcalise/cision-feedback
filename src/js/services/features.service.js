export default class Features {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }


  // Add Feature
  // add(slug, payload) {
  //   return this._$http({
  //     url: `${this._AppConstants.api}/features/${slug}/comments`,
  //     method: 'POST',
  //     data: { comment: { body: payload } }
  //   }).then((res) => res.data.comment);

  // }

  getAll() {
    return this._$http({
      url: `${this._AppConstants.api}/features`,
      method: 'GET',
    }).then((res) => res.data.features);

  }

  // destroy(commentId, articleSlug) {
  //   return this._$http({
  //     url: `${this._AppConstants.api}/articles/${articleSlug}/comments/${commentId}`,
  //     method: 'DELETE',
  //   });
  // }

}