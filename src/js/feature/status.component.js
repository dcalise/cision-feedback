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

    this.changeStatus = function() {
      if (this.editing) {
        this.editing = false
      } else {
        this.editing = true
      }
    }

  }
}

let Status = {
  bindings: {
    data: '='
  },
  controller: StatusCtrl,
  templateUrl: 'feature/status.html'
};

export default Status;
