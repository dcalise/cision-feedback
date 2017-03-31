class FeedbackCreateCtrl {
  constructor(AppConstants, Features, $http, $q, $state, profile, currentAuth) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._$state = $state;

    this._Features = Features;
    this._currentAuth = currentAuth;
    this._profile = profile;
    
  }

   addFeature(){
    this.featureForm.isSubmitting = true;

    this._Features.add(this.featureForm, this._currentAuth, this._profile).then(
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
