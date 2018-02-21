export default function featuresFilter() {
    'ngInject';

    return (features, filterParams) => {
        let output = [];

        angular.forEach(features, feature => {
            let statusMatch = false;
            let labelMatch = false;
            let locationMatch = false;
            let activeStatusMatch = false;

            // check status
            for (let status of filterParams.status) {
                if (status.displayName === feature.status && status.checked) {
                    statusMatch = true;
                    break;
                }
            }

            // check label
            for (let label of filterParams.labels) {
                if (label.$id === 'undefined' && label.checked) {
                    if (!feature.label) {
                        labelMatch = true;
                        break;
                    }
                }
                if (feature.labels) {
                    for (let featureLabel of feature.labels) {
                        if (featureLabel === label.$id && label.checked) {
                            labelMatch = true;
                            break;
                        }
                    }
                }
                if (labelMatch) {
                    break;
                }
            }

            // check location
            for (let location of filterParams.locations) {
                if (location.$id === 'undefined' && location.checked) {
                    if (!feature.location) {
                        locationMatch = true;
                        break;
                    }
                }
                if (feature.location === location.$id && location.checked) {
                    locationMatch = true;
                    break;
                }
            }

            // check archive
            if (filterParams.viewArchived === true) {
                if (feature.activeState > 0) {
                    activeStatusMatch = true;
                }
            } else if (feature.activeState > 1) {
                activeStatusMatch = true;
            }

            if (
                statusMatch &&
                labelMatch &&
                locationMatch &&
                activeStatusMatch
            ) {
                output.push(feature);
            }
        });

        return output;
    };
}
