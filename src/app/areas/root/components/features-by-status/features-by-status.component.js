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
                        .forEach(key => this.data.push(this.statusCounts[key].length));
                    this.buildChart(featuresByStatusElement)
                }
            )

        this.$apply;
    }

    buildChart(chartElement) {
        if (this.featuresByStatusChart) {
            this.featuresByStatusChart.destroy();
        }

        this.featuresByStatusChart = new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.statusCounts),
                datasets: [{
                    data: this.data,
                    backgroundColor: [
                        'rgba(119, 119, 119, 0.2)',
                        'rgba(240, 173, 78, 0.2)',
                        'rgba(91, 192, 222, 0.2)',
                        'rgba(92, 184, 92, 0.2)',
                        'rgba(217, 83, 79, 0.2)'
                    ],
                    borderColor: [
                        'rgba(119, 119, 119, 1)',
                        'rgba(240, 173, 78, 1)',
                        'rgba(91, 192, 222, 1)',
                        'rgba(92, 184, 92, 1)',
                        'rgba(217, 83, 79, 1)'
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
