class DisplayLabelCtrl {
    constructor(LabelService) {
        'ngInject';

        this._LabelService = LabelService;
        this.displayName;
    }

    $onInit() {
        this._LabelService
            .getDisplayName(this.data, this.isLocation)
            .then(locationDisplayName => {
                this.displayName = locationDisplayName;
            });
        // console.log('on init: %s', this._LabelService.getDisplayName(this.data, this.labelType));
        this.displayName = this._LabelService.getDisplayName(
            this.data,
            this.isLocation
        );
    }
}

let DisplayLabel = {
    bindings: {
        data: '=',
        isLocation: '<?'
    },
    controller: DisplayLabelCtrl,
    templateUrl: 'components/display-label/display-label.html'
};

export default DisplayLabel;
