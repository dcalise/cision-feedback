class StatusCtrl {
  constructor(Auth, Users) {
    'ngInject';
    
    this.admin = false;
    Auth.$requireSignIn().then(
      (auth) => {
        Users.getProfile(auth.uid).$loaded().then(
          (profile) => {
            if (profile.roles.admin) {
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
  templateUrl: 'feature/status.html'
};

export default Status;
