class FeaturesByLocationCtrl {
    constructor(LabelService, FeatureService) {
        'ngInject';

        this._LabelService = LabelService;
        this._FeatureService = FeatureService;

        this.featuresByLocationElement = document.getElementById('features-by-location');
    }

    $onInit() {


        this.locationNames = [];
        this.locationKeys = [];
        this.locationCounts = {}
        this.data = []

        this._LabelService._locations
            .$loaded()
            .then(
                locations => {
                    locations.forEach(
                        location => {
                            this.locationNames.push(location.displayName)
                            this.locationKeys.push(location.$id);
                        }
                    );
                    this.countFeaturesByLocation()
                }

            );





    }

    countFeaturesByLocation() {
        this._FeatureService._features
            .$loaded()
            .then(
                features => {
                    this.locationKeys.forEach(
                        locationKey => {
                            this.locationCounts[locationKey] = features .filter(
                                feature => {
                                    return feature.location === locationKey
                                }
                            );
                        }
                    )
                    Object.keys(this.locationCounts)
                        .forEach(key => this.data.push(this.locationCounts[key].length));
                        this.buildChart(this.featuresByLocationElement);
                }
            )
    }

    buildChart(chartElement) {
        this.featuresByLocationChart = new Chart(chartElement, {
            type: 'horizontalBar',
            data: {
                labels: this.locationNames,
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

let FeaturesByLocation = {
    controller: FeaturesByLocationCtrl,
    templateUrl: 'areas/root/components/features-by-location/features-by-location.html'
}

export default FeaturesByLocation;
