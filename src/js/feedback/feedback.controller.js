class FeedbackCtrl {
  constructor(AppConstants, Features, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._Features = Features;

    Features.getAll().then(
      (features) => this.features = features
    );
    
  }
  
}


export default FeedbackCtrl;
