class AccountsByTypeCtrl {
    constructor(AppConstants, AccountService) {
        'ngInject';

        this.accountTypes = AppConstants.strings.account.accountTypes;
        this._AccountService = AccountService;

        this.data = [21,1,4,62];
    }

    $onInit() {
        const accountsByTypeElement = document.getElementById('accounts-by-type');

        this.typeCounts = {};
        this.data = [];
        this._AccountService.accounts
            .$loaded()
            .then(
                accounts => {
                    this.accountTypes.forEach(
                        type => {
                            this.typeCounts[type] = accounts
                                .filter(account => {
                                    return account.accountType === type
                                });
                        }
                    )
                    Object.keys(this.typeCounts)
                        .forEach(key => this.data.push(this.typeCounts[key].length));
                        this.buildChart(accountsByTypeElement)
                }
            )
    }

    buildChart(chartElement) {
        if (this.accountsByTypeChart) {
            this.accountsByTypeChart.destroy();
        }

        this.accountsByTypeChart = new Chart(chartElement, {
            type: 'bar',
            data: {
                labels: Object.keys(this.typeCounts),
                datasets: [{
                    data: this.data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: false
            }
        });

        this.$apply;
    }
}

let AccountsByType = {
    controller: AccountsByTypeCtrl,
    templateUrl: 'areas/root/components/accounts-by-type/accounts-by-type.html'
}

export default AccountsByType;
