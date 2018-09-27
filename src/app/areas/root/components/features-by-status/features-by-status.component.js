import Chart from 'chart.js';

class FeaturesByStatusCtrl {
    constructor() {
        'ngInject';
    }

    $onInit() {
        const featuresByStatusElement = document.getElementById('featuresByStatus');

        if (this.featuresByStatusChart) {
            this.featuresByStatusChart.destroy();
        }

        this.featuresByStatusChart = new Chart(featuresByStatusElement, {
            type: 'doughnut',
            data: {
                labels: ["Received", "Under Review", "Moved to Backlog", "Released"],
                datasets: [{
                    data: [12, 19, 3, 5],
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

        this.$apply;
    }
}

let FeaturesByStatus = {
    controller: FeaturesByStatusCtrl,
    templateUrl: 'areas/root/components/features-by-status/features-by-status.html'
};

export default FeaturesByStatus;
