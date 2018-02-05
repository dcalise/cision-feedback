export default function statusFilter() {
    'ngInject';

    return (data, statusObject) => {
        let output = [];

        angular.forEach(data, item => {
            if (statusObject.indexOf(item.status) > -1) {
                output.push(item);
            }
        });

        return output;
    }
    
}