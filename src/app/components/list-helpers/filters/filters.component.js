class FiltersCtrl {
    constructor(LabelService, $scope) {
        'ngInject';

        this._LabelService = LabelService;
        this._$scope = $scope;
    }

    $onInit() {
        this.loading = true;

        this.statusList = [
            'Received',
            'Under Review',
            'Moved to Backlog',
            'Released',
            'Closed'
        ];

        this.labelList = this._LabelService._labels;

        this.locationList = [];
        this._LabelService._locations.$loaded(locations => {
            let activeLocations = [];
            locations.filter(location => {
                if (!location.deleted) {
                    activeLocations.push(location);
                }
            });
            return (this.locationList = activeLocations);
        });
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
                    match = idx;
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
        } else if (labelId === 'undefined') {
            this.filterParams.labels.push('undefined');
        } else {
            this.filterParams.labels.push(
                this._LabelService._labels.$getRecord(labelId)
            );
        }

        this.updateFilters({ filterParams: this.filterParams });
    }

    toggleLocation(locationId) {
        let match = null;

        for (let [idx, locationObj] of this.filterParams.locations.entries()) {
            if (locationId === 'undefined') {
                if (locationObj === 'undefined') {
                    match = idx;
                    break;
                }
            }
            if (locationObj.$id === locationId) {
                match = idx;
                break;
            }
        }

        if (match !== null) {
            this.filterParams.locations.splice(match, 1);
        } else if (locationId === 'undefined') {
            this.filterParams.locations.push('undefined');
        } else {
            this.filterParams.locations.push(
                this._LabelService._locations.$getRecord(locationId)
            );
        }

        this.updateFilters({ filterParams: this.filterParams });
    }

    toggleViewArchived() {
        this.filterParams.viewArchived = !this.filterParams.viewArchived;
        this.updateFilters({ filterParams: this.filterParams });
    }

    checkAllStatuses() {
        this.filterParams.status = this.statusList.slice(0);
        this.updateFilters({ filterParams: this.filterParams });
    }

    uncheckAllStatuses() {
        this.filterParams.status = [];
        this.updateFilters({ filterParams: this.filterParams });
    }

    checkAllLabels() {
        this.filterParams.labels = [];
        this._LabelService._labels.$loaded(labels => {
            angular.forEach(labels, label => {
                console.log(label);
                this.filterParams.labels.push(label);
            });
            this.filterParams.labels.push('undefined');
            this.updateFilters({ filterParams: this.filterParams });
        });
    }

    uncheckAllLabels() {
        this.filterParams.labels = [];
        this.updateFilters({ filterParams: this.filterParams });
    }

    checkAllLocations() {
        this.filterParams.locations = [];
        this._LabelService._locations.$loaded(locations => {
            let activeLocations = [];
            locations.filter(location => {
                if (!location.deleted) {
                    activeLocations.push(location);
                }
            });
            angular.forEach(activeLocations, location => {
                this.filterParams.locations.push(location);
            });
            this.filterParams.locations.push('undefined');
            this.updateFilters({ filterParams: this.filterParams });
        });
    }

    uncheckAllLocations() {
        this.filterParams.locations = [];
        this.updateFilters({ filterParams: this.filterParams });
    }

    setFiltersToCachedParams() {
        this.filterParams = this.cachedFilterParams;
    }

    resetFiltersToDefault() {
        this.filterParams = {
            status: [],
            labels: [],
            locations: [],
            viewArchived: false
        };

        this.filterParams.status = this.statusList.slice(0);
        this.checkAllLabels();

        this.checkAllLocations();
        this.resetFilterExpiration();
    }

    $onChanges(changes) {
        if (changes.cachedFilterParams && !changes.cachedFilterParams.previousValue) {
            this.setFiltersToCachedParams();
        }

        if (changes.expiredFilters && changes.expiredFilters.currentValue) {
            this.resetFiltersToDefault();
        }
    }
}

let Filters = {
    bindings: {
        resetFilters: '&',
        expiredFilters: '<',
        resetFilterExpiration: '&',
        cachedFilterParams: '<',
        updateFilters: '&'
    },
    controller: FiltersCtrl,
    templateUrl: 'components/list-helpers/filters/filters.html'
};

export default Filters;
