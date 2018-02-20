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

        this.filterParams = {
            status: [],
            locations: [],
            labels: [],
            viewArchived: false
        };

        // build locations
        this._LabelService._locations.$loaded(locations => {
            let activeLocations = [];
            locations.filter(location => {
                if (!location.deleted) {
                    activeLocations.push(location);
                }
            });
            let filterLocations = activeLocations.map(location => {
                location.checked = true;
                return location;
            });
            this.filterParams.locations = filterLocations;
            this.filterParams.locations.push({
                $id: 'undefined',
                checked: true
            });
            this.updateFilters({ filterParams: this.filterParams });
        });

        // build labels
        this._LabelService._labels.$loaded(labels => {
            let filterLabels = labels.map(label => {
                label.checked = true;
                return label;
            });
            this.filterParams.labels = filterLabels;
            this.filterParams.labels.push({
                $id: 'undefined',
                checked: true
            });
            this.updateFilters({ filterParams: this.filterParams });
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
        let matchIdx = null;

        for (let [idx, label] of this.filterParams.labels.entries()) {
            if (label.$id === labelId) {
                matchIdx = idx;
                break;
            }
        }
        if (matchIdx !== null) {
            this.filterParams.labels[matchIdx].checked = !this.filterParams
                .labels[matchIdx].checked;
        }

        this.updateFilters({ filterParams: this.filterParams });
    }

    toggleLocation(locationId) {
        let matchIdx = null;

        for (let [idx, location] of this.filterParams.locations.entries()) {
            if (location.$id === locationId) {
                matchIdx = idx;
                    break;
                }
            }
        if (matchIdx !== null) {
            this.filterParams.locations[matchIdx].checked = !this.filterParams
                .locations[matchIdx].checked;
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
        angular.forEach(
            this.filterParams.labels,
            label => (label.checked = true)
        );
            this.updateFilters({ filterParams: this.filterParams });
    }

    uncheckAllLabels() {
        angular.forEach(
            this.filterParams.labels,
            label => (label.checked = false)
        );
        this.updateFilters({ filterParams: this.filterParams });
    }

    checkAllLocations() {
        angular.forEach(
            this.filterParams.locations,
            location => (location.checked = true)
        );
        this.updateFilters({ filterParams: this.filterParams });
    }

    uncheckAllLocations() {
        angular.forEach(
            this.filterParams.locations,
            location => (location.checked = false)
        );
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
