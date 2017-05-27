function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/login.html',
    title: 'Sign in',
    resolve: {
      requireNoAuth: function($state, Auth){
        return Auth.$requireSignIn().then(
          (auth) => {
            $state.go('app.features')
          },
          (err) => {
            return
          }
        ) 
      }
    }
   
  })

  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/register.html',
    title: 'Sign up',
    resolve: {
      requireNoAuth: function($state, Auth){
        return Auth.$requireSignIn().then(
          (auth) => {
            $state.go('app.features')
          },
          (err) => {
            return
          }
        ) 
      }
    }
  })

}

export default AuthConfig;
