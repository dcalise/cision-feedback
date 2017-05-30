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

    this.changeStatus = function(data) {
      if (this.editing) {
        this.updateStatus(data)
        this.editing = false
      } else {
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
