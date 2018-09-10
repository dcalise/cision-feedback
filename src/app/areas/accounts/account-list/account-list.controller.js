class AccountListCtrl {
    constructor(
        $localStorage,
        FeatureService,
        AccountService,
        moment
    ) {
        'ngInject';

        this._AccountService = AccountService;
        this.$localStorage = $localStorage;
        $this._FeatureService = FeatureService;
        this._moment = moment;
    }

    $onInit() {
        this.$localStorage.accountsTimestamp = this._moment();

        this.accounts = this._AccountService.accounts;

        this.expiredFilters = false;

        this.searchAccounts = '';

        if (typeof this.getTablePrefs() === 'undefined') {
            this.resetTablePrefs();
        } {
            this.tablePrefs = {
                type: this.getTablePrefs().type,
                reverse: this.getTablePrefs().reverse,
                width: this.getTablePrefs().width,
                columns: this.getTablePrefs().columns
            };
        }
    }

    getCacheTimestamp() {
        return this._moment(this.$localStorage.accountsTimestamp).diff(
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
        this.$localStorage.accountsTablePrefsSaved = prefs;
    }

    setCachedFilterParams(params) {
        this.$localStorage.accountsCachedFilterParams = params;
        this.filterFeatures();
    }

    getCachedFilterParams() {
        if (this.getCacheTimestamp() < -11) {
            delete this.$localStorage.accountsCachedFilterParams;
        }
        if (this.$localStorage.accountsCachedFilterParams) {
            this.filterParams = this.$localStorage.accountsCachedFilterParams;
            this.updateFilters(this.filterParams);
        } else {
            this.resetFilters();
        }
    }

    getTablePrefs() {
        if (this.getCacheTimestamp() < -11) {
            delete this.$localStorage.accountsTablePrefsSaved;
        }
        return this.$localStorage.accountsTablePrefsSaved;
    }

    resetTablePrefs() {
        this.tablePrefs = {
            type: 'dateCreated',
            reverse: true,
            width: 'container',
            columns: {
                // status: {
                //     id: 'status',
                //     display: true,
                //     displayName: 'Status'
                // },
                // location: {
                //     id: 'location',
                //     display: false,
                //     displayName: 'Workflow'
                // },
                // labels: {
                //     id: 'labels',
                //     display: true,
                //     displayName: 'Labels'
                // },
                // summary: {
                //     id: 'subject',
                //     display: true,
                //     displayName: 'Summary'
                // },
                // originalRequester: {
                //     id: 'accountsMeta[0].name',
                //     display: true,
                //     displayName: 'Original Requester'
                // },
                // date: {
                //     id: 'dateCreated',
                //     display: true,
                //     displayName: 'Date'
                // },
                // totalValue: {
                //     id: 'totalValue',
                //     display: true,
                //     displayName: 'Total Value',
                //     thAlign: 'text-right'
                // },
                // averageValue: {
                //     id: 'averageValue',
                //     display: false,
                //     displayName: 'Average Value',
                //     thAlign: 'text-right'
                // }
            }
        };
        this.searchAccounts = '';

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

    filterAccounts() {
        this.filteredAccounts = this._$filter('accountsFilter')(
            this.features,
            this.filterParams
        );
    }
}

export default AccountListCtrl;
