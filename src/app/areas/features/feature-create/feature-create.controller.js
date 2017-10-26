class FeedbackCreateCtrl {
  constructor(AccountService, FeatureService, $state, profile, currentAuth, LabelService) {
    'ngInject';

    this._$state = $state;

    this._AccountService = AccountService;
    this._FeatureService = FeatureService;
    this._LabelService = LabelService;
    this._currentAuth = currentAuth;
    this._profile = profile;

    this.productLocations = []
    this.locationLabels = []

  }

  getProductLocations() {
    this._LabelService.getProduct(this.featureForm.product).$loaded().then(
      (product) => {
        this.productLocations = [];
        angular.forEach(product.locations, (locationId) => {
          this._LabelService.getLocation(locationId).$loaded().then(
            (location) => {
              this.productLocations.push(location)
            }
          )
        });
      }
    )
  }

  getLocationLabels() {
    this._LabelService.getLocation(this.featureForm.location).$loaded().then(
      (location) => {
        this.locationLabels = [];
        angular.forEach(location.labels, (labelId) => {
          this._LabelService.getLabel(labelId).$loaded().then(
            (label) => {
              this.locationLabels.push(label)
            }
          )
        });
      }
    )
  }

  addAccountAndFeature() {
    if (this.newAccount === true) {
      this._AccountService.add(this.accountForm).then(
        (account) => {
          let accountTieObject = {
            accountKey: account.key,
            accountTie: this.featureForm.accountTie
          }
          // TODO: can we delete profile argument?
          this._FeatureService.add(this.featureForm, this._currentAuth, this._profile, accountTieObject).then(
            () => {
              this._$state.go('app.feature-list');
            },
            () => {
              this.featureForm.isSubmitting = false;
              console.log('errors');
            }
          )
        },
        (error) => { console.log(error) }
      )
    } else {
      this._FeatureService.add(this.featureForm, this._currentAuth, this._profile, this.accountForm.selectedAccounts).then(
        () => {
          this._$state.go('app.feature-list');
        },
        (err) => {
          this.featureForm.isSubmitting = false;
          console.log(err);
        }
      )
    }
  }

}


export default FeedbackCreateCtrl;
