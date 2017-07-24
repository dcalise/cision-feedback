function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      currentAuth: function(AuthService) {
        return AuthService.$requireSignIn()
      },
      profile: function(Users, AuthService) {
        return AuthService.$requireSignIn().then(
          (auth) => {
            return Users.getProfile(auth.uid).$loaded()
          }
        )
      }
    }
  });

};

export default HomeConfig;
