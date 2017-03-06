class FeedbackCreateCtrl {
  constructor(AppConstants, Features, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._Features = Features;

    Features.getAll().then(
      (features) => {
        console.log(this);
        this.features = features
      }
    );
    // console.log(this.features);
  }
  // this probably has to move to services
  // createFeature() {
  //   this.isSubmitting = true;

  //   this._$http.post(this._AppConstants.api + '/features', this.formData).then(
  //     (res) => {
  //       console.log(res);
  //       console.log('success!');
  //     },
  //     (err) => {
  //       console.log(err.data.errors);
  //     }
  //   )
  // }
}


export default FeedbackCreateCtrl;
