// export default class User {
//   constructor($http, $state, $q, $location, $rootScope, $timeout) {
//     'ngInject';

//     this._$http = $http;
//     this._$state = $state;
//     this._$q = $q;
//     this._$location = $location;
//     this._$rootScope = $rootScope;
//     this._$timeout = $timeout;

//   }

//   checkLoggedin(){ 
//     // Initialize a new promise
//     var deferred = this._$q.defer(); 
//     // Make an AJAX call to check if the user is logged in
//     this._$http.get('/loggedin').success(function(user){ 
//       // Authenticated
//       if (user !== '0')
//         deferred.resolve(); 
//       // Not Authenticated 
//       else {
//         this._$rootScope.message = 'You need to log in.';
//         deferred.reject();
//         this._$location.url('/login');
//       } 
//     });
  
//     return deferred.promise;
//   };

// }
