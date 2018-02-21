class LabelControl {
    constructor(AuthService, UserService, LabelService) {
        'ngInject';
        this._LabelService = LabelService;
        let initLabels;
        this.changeLabels = labelArray => {
            if (this.editing) {
                if (labelArray.labels === false) {
                    this.data = initLabels;
                } else {
                    this.updateLabels();
                }
                this.editing = false;
            } else {
                initLabels = Array.from(this.data);
                this.editing = true;
            }
        };

        this.removeLabel = labelId => {
            this.data.splice(this.data.indexOf(labelId), 1);
        };
    }
}
let Labels = {
    bindings: {
        admin: '< ',
        data: '=',
        updateLabels: ' & ',
        expiredLabel: '< ',
        resetLabelExpiration: '& '
    },
    controller: LabelControl,
    templateUrl: 'areas/features/feature-detail/components/labels/labels.html'
};

export default Labels;
