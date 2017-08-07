class AdminCtrl {
  constructor(currentAuth, profile, AuthService, UserService, LabelService) {
    'ngInject';

    this._profile = profile;
    
    this.admin = false;
    AuthService.$requireSignIn().then(
      (auth) => {
        UserService.getProfile(auth.uid).$loaded().then(
          (profile) => {
            if (profile.roles && profile.roles.admin === true) {
              this.admin = true;
            }
          }
        )
      }
    )

    this._LabelService = LabelService;

  }

  addLabel(label) {
    this._LabelService.addLabel(label.name, label.description).then(
      (label) => console.log(label)
    );
  }

  addLocation(location) {
    this._LabelService.addLocation(location.name, location.description, location.labels).then(
      (location) => console.log(location)
    );
  }

  addProduct(product) {
    this._LabelService.addProduct(product.name, product.description, product.locations).then(
      (product) => console.log(product)
    );
  }

}

export default AdminCtrl;
