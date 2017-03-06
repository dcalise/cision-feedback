class FeedbackCreateCtrl {
  constructor(AppConstants, Features, $http, $q, $state) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._Features = Features;
    this._$state = $state;

    Features.getAll().then(
      (features) => {
        this.features = features
        // console.log(this);
      }
    );
  }

   addFeature(){
    this.featureForm.isSubmitting = true;

    this._Features.add(this.featureForm).then(
      (feature) => {
        this._$state.go('app.features');
      },
      (err) => {
        this.featureForm.isSubmitting = false;
        console.log('errors');
        console.log(err);
      }
    )
  }

}


export default FeedbackCreateCtrl;
