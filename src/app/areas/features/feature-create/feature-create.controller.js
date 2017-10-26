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
  
    // Toggle selection for a label
    this.toggleSelection = function toggleSelection(label) {
      var idx = this.featureForm.labels.indexOf(label)
  
      // Is currently selected
      if (idx > -1) {
        this.featureForm.labels.splice(idx, 1)
      }
  
      // Is newly selected
      else {
        this.featureForm.labels.push(label)
      }
    }

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
          this._FeatureService.add(this.featureForm, this._currentAuth, accountTieObject).then(
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
      this._FeatureService.add(this.featureForm, this._currentAuth, this.accountForm.selectedAccounts).then(
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
