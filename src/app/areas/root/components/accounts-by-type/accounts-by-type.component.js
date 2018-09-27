class AccountsByTypeCtrl {
    constructor(AppConstants) {
        'ngInject';

        this.accountTypes = AppConstants.strings.account.accountTypes;

        this.data = [21,1,4,62];
    }

    $onInit() {
        const accountsByTypeElement = document.getElementById('accounts-by-type');

        this.accountsByTypeChart = new Chart(accountsByTypeElement, {
            type: 'bar',
            data: {
                labels: this.accountTypes,
                datasets: [{
                    data: this.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
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
