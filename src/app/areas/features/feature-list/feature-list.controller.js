class FeatureListCtrl {
    constructor(
        $http,
        $filter,
        $location,
        $q,
        $localStorage,
        AccountService,
        FeatureService
    ) {
        'ngInject';

        this._FeatureService = FeatureService;
        // this._PagerService = PagerService;
        this._$filter = $filter;
        this._$location = $location;
        this._$localStorage = $localStorage;

        this.features = this._FeatureService._featuresActive;

        this.paginatedFeatues = [];
        this.features.$loaded().then(features => {
            angular.forEach(features, function(feature) {
                feature.accountsMeta = [];
                feature.totalValue = 0;
                angular.forEach(feature.accounts, function(account) {
                    AccountService.getAccount(account.accountKey).then(
                        account => {
                            feature.accountsMeta.push(account);
                            feature.totalValue += parseInt(account.value);
                        }
                    );
                });
                // console.log(this);
            });

            this.pageLimit = 10;
            this.currentPage = 1;
            this.pageStart = 0;
            if ($location.hash() && $location.hash() != 1) {
                this.pageStart = $location.hash() - 1 + this.pageLimit;
                this.currentPage = $location.hash();
            }
            this.paginatedFeatures = $filter('limitTo')(
                this.features,
                this.pageLimit,
                this.pageStart
            );
        });

        // this.pager = {};
        // this.paginatedFeatures = {};
    }

    $onInit() {
        this.searchFeatures = '';

        // set default
        if (typeof this.getTablePrefs() === 'undefined') {
            this.tablePrefs = {
                type: 'dateCreated',
                reverse: true,
                width: 'container',
                currentPage: 1,
                columns: {
                    status: {
                        id: 'status',
                        display: true,
                        displayName: 'Status'
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
                    }
                }
            };
            // grab from local storage
        } else {
            this.tablePrefs = {
                type: this.getTablePrefs().type,
                reverse: this.getTablePrefs().reverse,
                width: this.getTablePrefs().width,
                columns: this.getTablePrefs().columns,
                currentPage: this.getTablePrefs().currentPage
            };
        }
    }

    // setPage(page) {
    //     if (page < 1 || page > this.pager.totalPages) {
    //         return;
    //     }

    //     // get pager object from service
    //     this.pager = this._PagerService.getPager(this.features.length, page);

    //     // get current page of items
    //     this.paginatedFeatures = this.features.slice(
    //         this.pager.startIndex,
    //         this.pager.endIndex + 1
    //     );

    //     this.tablePrefs.currentPage = page;
    // }
    changePage(page, pageSize, total) {
        this.paginatedFeatures = this._$filter('limitTo')(
            this.features,
            this.pageLimit,
            page -1 + this.pageLimit
        );
    }

    changeColumnSort(col, reverse) {
        this.tablePrefs.reverse = false;
        if (this.tablePrefs.type == col) {
            this.tablePrefs.reverse = !reverse;
        } else {
            this.tablePrefs.reverse = false;
            this.tablePrefs.type = col;
        }
        this.features = this._$filter('orderBy')(
            this.features,
            this.tablePrefs.type,
            this.tablePrefs.reverse
        );
        // this.setPage(1)
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
        this._$localStorage.tablePrefsSaved = prefs;
    }

    getTablePrefs() {
        return this._$localStorage.tablePrefsSaved;
    }
}

export default FeatureListCtrl;
