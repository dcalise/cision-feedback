function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'areas/root/home.html',
    title: 'Home',
    resolve: {
      currentAuth: function(AuthService, $state) {                 return AuthService.$requireSignIn().then(auth => {                     if (!auth.emailVerified) {                         $state.go('app.verify');                     }                 });             },
      profile: function(UserService, AuthService) {
        return AuthService.$requireSignIn().then(
          (auth) => {
            return UserService.getProfile(auth.uid).$loaded()
          }
        )
      }
    }
  });

};

export default HomeConfig;
