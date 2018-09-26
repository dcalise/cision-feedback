class LocationControl {
    constructor(AuthService, UserService, LabelService) {
        'ngInject';

        this._LabelService = LabelService;

        let initLocation;
        this.changeLocation = data => {
            if (this.editing) {
                if (!data.location) {
                    this.data = initLocation;
                } else {
                    this.updateLocation(location);
                }
                this.editing = false;
            } else {
                initLocation = this.data;
                this.editing = true;
            }
        };
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
    templateUrl: 'areas/features/feature-detail/components/location/location.html'
};

export default Location;
