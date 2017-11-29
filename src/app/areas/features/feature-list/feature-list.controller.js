class FeatureListCtrl {
    constructor($http, $q, $localStorage, FeatureService, AccountService) {
        'ngInject';

        this._FeatureService = FeatureService;
        this.$localStorage = $localStorage;

        this.features = this._FeatureService.all;

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
            });
        });

        this.tableWidth = 'container';

        this.columns = {
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
        };
    }

    $onInit() {
        // set default
        if (typeof this.getColumnPrefs() === 'undefined') {
            this.sortPrefs = {
              type: 'dateCreated',
              reverse: true
            }
        // grab from local storage
        } else {
          this.sortPrefs = {
              type: this.getColumnPrefs().type,
              reverse: this.getColumnPrefs().reverse
          };
        }
        this.searchFeatures = '';
        console.log(this.sortPrefs)
    }

    sortColumnType(col, reverse) {
        this.sortPrefs.reverse = false;
        if (this.sortPrefs.type == col) {
            this.sortPrefs.reverse = !reverse;
        } else {
            this.sortPrefs.reverse = false;
            this.sortPrefs.type = col;
        }
        this.setColumnPrefs(this.sortPrefs);
    }

    setColumnPrefs(prefs) {
        this.$localStorage.sortTypeSaved = prefs;
    }

    getColumnPrefs() {
        return this.$localStorage.sortTypeSaved;
    }
}

export default FeatureListCtrl;
