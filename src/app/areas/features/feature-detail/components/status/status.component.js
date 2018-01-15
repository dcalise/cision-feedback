class StatusCtrl {
    constructor(AuthService, UserService) {
        'ngInject';
    }

    changeStatus(data) {
        if (this.editing) {
            if (data.status === 'cancel') {
                this.data = this.initStatus;
            } else {
                this.updateStatus(status);
            }
            this.editing = false;
        } else {
            this.initStatus = this.data;
            this.editing = true;
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
