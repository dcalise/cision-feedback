export default function statusFilter() {
    'ngInject';

    return (features, filterParams) => {
        let output = [];
        
        angular.forEach(features, feature => {
            let statusMatch = false;
            let labelMatch = false;

            if (filterParams.status.indexOf(feature.status) > -1) {
                statusMatch = true;
            }

            for (let label of filterParams.labels) {
                if (label === 'undefined') {
                    if (!feature.labels) {
                        labelMatch = true;
                        break;
                    }
                }
                if (feature.labels && feature.labels.indexOf(label.$id) > -1) {
                    labelMatch = true;
                    break;
                }
            }

            if (statusMatch && labelMatch) {
                output.push(feature);
            }
        });

        return output;
    };
}
