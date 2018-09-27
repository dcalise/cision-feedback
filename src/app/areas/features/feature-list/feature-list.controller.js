class FeatureListCtrl {
    constructor(
        $localStorage,
        FeatureService,
        AccountService,
        $filter,
        moment
    ) {
        'ngInject';

        this._FeatureService = FeatureService;
        this.$localStorage = $localStorage;
        this._AccountService = AccountService;
        this._$filter = $filter;
        this._moment = moment;
    }

    $onInit() {
        this.$localStorage.timestamp = this._moment();

        this.features = this._FeatureService._features;

        this.expiredFilters = false;

        this.features.$loaded().then(features => {
            features.forEach(feature => {
                if (!feature.totalValue || !feature.averageValue) {
                    this._FeatureService.updateTotalAndAverageValue(
                        feature.$id
                    );
                }
                if (!feature.originalRequester && feature.accounts) {
                    this._FeatureService.updateOriginalRequesterName(feature.$id);
                }
            });

            this.getCachedFilterParams();
        });

        this.searchFeatures = '';
        // set default
        if (typeof this.getTablePrefs() === 'undefined') {
            this.resetTablePrefs();
        } else {
            this.tablePrefs = {
                type: this.getTablePrefs().type,
                reverse: this.getTablePrefs().reverse,
                width: this.getTablePrefs().width,
                columns: this.getTablePrefs().columns
            };
        }
    }

    getCacheTimestamp() {
        return this._moment(this.$localStorage.timestamp).diff(
            this._moment(),
            'hours'
        );
    }

    changeColumnSort(col, reverse) {
        this.tablePrefs.reverse = false;
        if (this.tablePrefs.type === col) {
            this.tablePrefs.reverse = !reverse;
        } else {
            this.tablePrefs.reverse = false;
            this.tablePrefs.type = col;
        }
        this.setTablePrefs(this.tablePrefs);
    }

    changeTableWidth(width) {
        this.tablePrefs.width = width;
        this.setTablePrefs(this.tablePrefs);
    }

    changeColumnVisibility(column, key) {
        this.setTablePrefs(this.tablePrefs);
    }

    setTablePrefs(prefs) {
        this.$localStorage.tablePrefsSaved = prefs;
    }

    setCachedFilterParams(params) {
        this.$localStorage.cachedFilterParams = params;
        this.filterFeatures();
    }

    getCachedFilterParams() {
        if (this.getCacheTimestamp() < -11) {
            delete this.$localStorage.cachedFilterParams;
        }
        if (this.$localStorage.cachedFilterParams) {
            this.filterParams = this.$localStorage.cachedFilterParams;
            this.updateFilters(this.filterParams);
        } else {
            this.resetFilters();
        }
    }

    getTablePrefs() {
        if (this.getCacheTimestamp() < -11) {
            delete this.$localStorage.tablePrefsSaved;
        }
        return this.$localStorage.tablePrefsSaved;
    }

    resetTablePrefs() {
        this.tablePrefs = {
            type: 'dateCreated',
            reverse: true,
            width: 'container',
            columns: {
                status: {
                    id: 'status',
                    display: true,
                    displayName: 'Status'
                },
                location: {
                    id: 'location',
                    display: false,
                    displayName: 'Workflow'
                },
                labels: {
                    id: 'labels',
                    display: true,
                    displayName: 'Labels'
                },
                summary: {
                    id: 'subject',
                    display: true,
                    displayName: 'Summary'
                },
                originalRequester: {
                    id: 'accountsMeta[0].name',
                    display: true,
                    displayName: 'Original Requester'
                },
                date: {
                    id: 'dateCreated',
                    display: true,
                    displayName: 'Date'
                },
                totalValue: {
                    id: 'totalValue',
                    display: true,
                    displayName: 'Total Value',
                    thAlign: 'text-right'
                },
                averageValue: {
                    id: 'averageValue',
                    display: false,
                    displayName: 'Average Value',
                    thAlign: 'text-right'
                }
            }
        };
        this.searchFeatures = '';

        this.resetFilters();
        this.setTablePrefs(this.tablePrefs);
    }

    resetFilters() {
        this.expiredFilters = true;
    }

    resetFilterExpiration() {
        this.expiredFilters = false;
    }

    updateFilters(filterParams) {
        this.filterParams = filterParams;
        this.setCachedFilterParams(this.filterParams);
    }

    filterFeatures() {
        this.filteredFeatures = this._$filter('featuresFilter')(
            this.features,
            this.filterParams
        );
    }
}

export default FeatureListCtrl;
