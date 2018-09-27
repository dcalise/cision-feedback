import Chart from 'chart.js';

class FeaturesByStatusCtrl {
    constructor(AppConstants, FeatureService) {
        'ngInject';

        this._FeatureService = FeatureService;
        this.statuses = AppConstants.strings.feature.status;
    }

    $onInit() {
        const featuresByStatusElement = document.getElementById('featuresByStatus');

        this.statusCounts = {};
        this.data = [];
        this._FeatureService._features
            .$loaded()
            .then(
                features => {
                    this.statuses.forEach(
                        status => {
                            this.statusCounts[status] = features
                                .filter(feature => {
                                    return feature.status === status
                                });
                            }
                        )
                    Object.keys(this.statusCounts)
                        .forEach(statusCount => this.data.push(statusCount.length));
                    this.buildChart(featuresByStatusElement)
                }
            )

        this.$apply;
    }

    buildChart(chartElement) {
        if (this.featuresByStatusChart) {
            chartElement.destroy();
        }

        this.featuresByStatusChart = new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.statusCounts),
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
            }
        });
    }
}

let FeaturesByStatus = {
    controller: FeaturesByStatusCtrl,
    templateUrl: 'areas/root/components/features-by-status/features-by-status.html'
};

export default FeaturesByStatus;
