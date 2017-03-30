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
      "currentAuth": function(Auth) {
        return Auth.$requireSignIn().then(
          (auth) => console.log(this)
        )
      }
    }
  });

};

export default HomeConfig;
