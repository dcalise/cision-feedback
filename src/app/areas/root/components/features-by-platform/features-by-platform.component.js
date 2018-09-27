class FeaturesByPlatformCtrl {
    constructor(AppConstants) {
        'ngInject';

        this.currentPlatforms = AppConstants.strings.account.currentPlatforms;
        this.prospectPlatforms = AppConstants.strings.account.prospectPlatforms;
    }

    $onInit() {
        // removing other
        this.currentPlatforms.splice(-1,1);
        this.prospectPlatforms.splice(-1,1);

        // combining
        this.platforms = this.currentPlatforms.concat(this.prospectPlatforms);

        const featuresByPlatformElement = document.getElementById('features-by-platform');

        this.data = [5,10,20,25,34,21,32];

        this.featuresByPlatformChart = new Chart(featuresByPlatformElement, {
            type: 'horizontalBar',
            data: {
                labels: this.platforms,
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
                    xAxes: [{
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

let FeaturesByPlatform = {
    controller: FeaturesByPlatformCtrl,
    templateUrl: 'areas/root/components/features-by-platform/features-by-platform.html'
}

export default FeaturesByPlatform;
