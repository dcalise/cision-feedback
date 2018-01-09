function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

    .state('app.login', {
      url: '/login',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/login.html',
      title: 'Sign in',
      resolve: {
        requireNoAuth: function($state, AuthService) {
          return AuthService.$requireSignIn().then(
            auth => {
              $state.go('app.feature-list')
            },
            err => {
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
        requireNoAuth: function($state, AuthService) {
          return AuthService.$requireSignIn().then(
            auth => {
              $state.go('app.feature-list')
            },
            err => {
              return
            }
          )
        }
      }
    })

    .state('app.forgot-password', {
      url: '/forgot-password',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/forgot-password.html',
      title: 'Forgot Password',
      resolve: {
        requireNoAuth: function($state, AuthService) {
          return AuthService.$requireSignIn().then(
            auth => {
              $state.go('app.profile')
            },
            err => {
              return
            }
          );
        }
      }
    })

    .state('app.verify', {
      url: '/verify',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/verify.html',
      title: 'Please verify your account',
      // resolve: {
      //   requireNoAuth: function($state, AuthService) {
      //     return AuthService.$requireSignIn().then(
      //       auth => {
      //         $state.go('app.profile')
      //       },
      //       err => {
      //         return
      //       }
      //     );
      //   }
      // }
    })

}

export default AuthConfig
