class FiltersCtrl {
    constructor(LabelService) {
        'ngInject';

        this._LabelService = LabelService;
    }

    $onInit() {
        this.filterParams = {};

        this.statusList = ['Received', 'Viewed', 'Closed'];
        this.filterParams.status = this.statusList.slice(0);

        this.labelList = this._LabelService._labels;
        this.filterParams.labels = [];
        this._LabelService._labels.$loaded(labels => {
            angular.forEach(labels, label => {
                this.filterParams.labels.push(label);
            });
            this.filterParams.labels.push('undefined');
        });

        this.updateFilters({ filterParams: this.filterParams });
    }

    toggleStatus(status) {
        let idx = this.filterParams.status.indexOf(status);

        if (idx > -1) {
            this.filterParams.status.splice(idx, 1);
        } else {
            this.filterParams.status.push(status);
        }

        this.updateFilters({ filterParams: this.filterParams });
    }

    toggleLabel(labelId) {
        let match = null;

        for (let [idx, labelObj] of this.filterParams.labels.entries()) {
            if (labelId === 'undefined') {
                if (labelObj === 'undefined') {
                    match = idx
                    break;
                }
            }
            if (labelObj.$id === labelId) {
                match = idx;
                break;
            }
        }

        if (match !== null) {
            this.filterParams.labels.splice(match, 1);
        } else {
            if (labelId === 'undefined') {
              this.filterParams.labels.push('undefined')
            } else {
                this.filterParams.labels.push(
                    this._LabelService._labels.$getRecord(labelId)
                );
            }
        }

        this.updateFilters({ filterParams: this.filterParams });
    }
}

let Filters = {
    bindings: {
        updateFilters: '&'
    },
    controller: FiltersCtrl,
    templateUrl: 'components/list-helpers/filters/filters.html'
};

export default Filters;
