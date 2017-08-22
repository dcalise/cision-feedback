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
    
    this.locationLabels = {}

  }

  $onInit() {
    this.getLocationAndLabelList();  
  }
  
  getLocationAndLabelList() {
    this.locationAndLabelList = []
    this._LabelService._locations.$loaded().then(
      (locations) => {
        angular.forEach(locations, (location) => {
          let locationLabelObject = {
            $id: location.$id,
            displayName: location.displayName,
            description: location.description,
            deleted: location.deleted,
            labels: []
          }
          angular.forEach(location.labels, (labelId) => {
            this._LabelService.getLabel(labelId).$loaded().then(
              (label) => {
                let labelObject = {
                  $id: labelId,
                  displayName: label.displayName,
                  description: label.description

                }
                locationLabelObject.labels.push(labelObject)
              }
            )
          });
          this.locationAndLabelList.push(locationLabelObject);
        })
      }
    )
  }

  getLocationLabels(location) {
    
    this.locationLabels[location.$id] = [];
    angular.forEach(location.labels, (labelId) => {
      this._LabelService.getLabel(labelId).$loaded().then(
        (label) => {
          this.locationLabels[location.$id].push(label)
        }
      )
    });
  }


  addLabel(label) {
    this._LabelService.addLabel(label.name, label.description).then(
      () => this.labelForm = {}
    );
  }

  addLocation(location) {
    this._LabelService.addLocation(location.name, location.description, location.labels).then(
      () => {
        this.getLocationAndLabelList()
        this.locationForm = {}
      }
    );
  }

  removeLocation(locationId) {
    this._LabelService.getLocation(locationId).$loaded().then(
      (location) => {
        location.deleted = true;
        location.$save().then(() => this.getLocationAndLabelList())
      }
    )
  }
  
  removeLabelFromLocation(locationId, index) {
    this._LabelService.getLocation(locationId).$loaded().then(
      (location) => {
        location.labels.splice(index, 1);
        location.$save().then(() => this.getLocationAndLabelList())
      }
    )
  }
}

export default AdminCtrl;
