class LabelControl {
    constructor() {
        'ngInject';
    }

    $onInit() {

        let initLabels;
        this.changeLabels = labelArray => {
            if (this.editing) {
                // cancel
                if (labelArray.labels === false) {
                    this.data = initLabels;
                    this.labelsToAdd = [];
                // save
                } else {
                    if (this.labelsToAdd.length > 0) {
                        if (!this.data) {
                            this.data = [];
                        }
                        this.labelsToAdd.forEach(labelToAdd => {
                            if (this.data.indexOf(labelToAdd) < 0) {
                                this.data.push(labelToAdd);
                            }
                        });
                    }
                    this.labelsToAdd = [];
                    this.updateLabels();
                }
                this.editing = false;
                this.showAddLabel = false;
            } else {
                if (this.data) {
                    initLabels = Array.from(this.data);
                } else {
                    this.data = [];
                    this.showAddLabel = true;
                }
                this.editing = true;
            }
        };

        this.removeLabel = labelId => {
            this.data.splice(this.data.indexOf(labelId), 1);
        };

        this.labelSelected = label => {
            let labelKey = label.originalObject
                ? label.originalObject.$id
                : label.key;
            return this.labelsToAdd.push(labelKey);
        };
    }
}
let Labels = {
    bindings: {
        admin: '< ',
        data: '=',
        updateLabels: ' & ',
        expiredLabel: '< ',
        resetLabelExpiration: '&',
        searchData: '<',
        searchFunction: '<'
    },
    controller: LabelControl,
    templateUrl: 'areas/features/feature-detail/components/labels/labels.html'
};

export default Labels;
