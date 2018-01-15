class LocationControl {
    constructor(AuthService, UserService, LabelService) {
        'ngInject';

        this._LabelService = LabelService;
        this._data = this.data;
    }

    $onInit() {
        let initLocation;
    }

    changeLocation(data) {
        if (this.editing) {
            if (data.location === 'cancel') {
                this.data = this.initLocation;
            } else {
                this.updateLocation(location);
            }
            this.editing = false;
        } else {
            this.initLocation = data;
            this.editing = true;
        }
    }
}

let Location = {
    bindings: {
        admin: '<',
        data: '=',
        updateLocation: '&',
        expiredLabel: '<',
        resetLabelExpiration: '&'
    },
    controller: LocationControl,
    templateUrl:
        'areas/features/feature-detail/components/location/location.html'
};

export default Location;
