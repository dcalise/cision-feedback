class StatusCtrl {
  constructor(AuthService, UserService) {
    'ngInject';
    
    this.admin = false;
    AuthService.$requireSignIn().then(
      (auth) => {
        UserService.getProfile(auth.uid).$loaded().then(
          (profile) => {
            if (profile.roles && profile.roles.admin === true) {
              this.admin = true;
            }
          }
        )
      }
    )

    let initStatus;
    this.changeStatus = function(data) {
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
    data: '=',
    updateStatus: '&'
  },
  controller: StatusCtrl,
  templateUrl: 'areas/features/feature-detail/components/status/status.html'
};

export default Status;
