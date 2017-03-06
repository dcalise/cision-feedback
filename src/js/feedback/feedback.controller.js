class FeedbackCtrl {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;

  }
  getFeatures() {
    $http.get(this._AppConstants.api + '/features')
      .success(function(res) {
        console.log(res);
        console.log('success');
      })
      .error(function(err) {
        console.log('errors');
        console.log(err);
      });
  }
}


export default FeedbackCtrl;
