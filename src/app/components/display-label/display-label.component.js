class DisplayLabelCtrl {
    constructor(LabelService) {
        'ngInject';

        this._LabelService = LabelService;
        this.displayName;
    }

    $onInit() {
        this.fetchDisplayName(this.data, this.isLocation);
    }

    fetchDisplayName(data, isLocation) {
        this._LabelService
            .getDisplayName(data, isLocation)
            .then(locationDisplayName => {
                this.displayName = locationDisplayName;
            });
    }

    $onChanges(changes) {
        if (changes.expiredLabel.currentValue) {
            this.fetchDisplayName(this.data, this.isLocation);
            this.resetLabelExpiration();
        }
    }
}

let DisplayLabel = {
    bindings: {
        data: '=',
        isLocation: '<?',
        expiredLabel: '<',
        resetLabelExpiration: '&'
    },
    controller: DisplayLabelCtrl,
    templateUrl: 'components/display-label/display-label.html'
};

export default DisplayLabel;
