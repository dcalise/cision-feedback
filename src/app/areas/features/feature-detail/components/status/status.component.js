class StatusCtrl {
    constructor() {
        'ngInject';

        let initStatus;
        this.changeStatus = function (data) {
            if (this.editing) {
                if (data.status === 'cancel') {
                    this.data = initStatus
                } else {
                    this.updateStatus(status)
                }
                this.editing = false
            } else {
                initStatus = this.data
                this.editing = true
            }
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
