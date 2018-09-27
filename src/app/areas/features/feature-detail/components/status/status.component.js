class StatusCtrl {
    constructor(AppConstants) {
        'ngInject';

        this.statusTypes = AppConstants.strings.feature.status;
        let initStatus;

        this.changeStatus = function (data) {
            if (this.editing) {
                if (data.status === 'cancel') {
                    this.data = initStatus
                } else {
                    this.updateStatus(status)
                    this.updateLabelClass();
                }
                this.editing = false
            } else {
                initStatus = this.data
                this.editing = true
            }
        }

    }

    $onInit() {
        this.updateLabelClass();
    }

    updateLabelClass() {
        switch (this.data) {
            case 'Released':
                this.labelClass = 'label-success';
                break;
            case 'Moved to Backlog':
                this.labelClass = 'label-info';
                break;
            case 'Received':
                this.labelClass = 'label-default';
                break;
            case 'Under Review':
                this.labelClass = 'label-warning';
                break;
            case 'Closed':
                this.labelClass = 'label-danger';
                break;
            default:
                this.labelClass = 'label-default';
                break;
        }
    }
}

let Status = {
    bindings: {
        admin: '<',
        data: '=',
        updateStatus: '&'
    },
    controller: StatusCtrl,
    templateUrl: 'areas/features/feature-detail/components/status/status.html'
};

export default Status;
