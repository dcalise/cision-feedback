import angular from 'angular';
import * as firebase from "firebase";
import 'angularfire';
import 'angular-md5';
import 'angucomplete-alt';
import 'angular-validation-match';
import 'angular-toastr';

// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import firebaseConfig  from './config/firebase.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './auth';
import './layout';
import './components';
import './areas/admin';
import './areas/root';
import './areas/features/feature-detail';
import './areas/features/feature-list';
import './areas/features/feature-create';
import './areas/profile';
import './services';


// Create and bootstrap application
const requires = [
  'ui.router',
  'firebase',
  'angular-md5',
  'templates',
  'app.admin',
  'app.auth',
  'app.layout',
  'app.components',
  'app.home',
  'app.feature-detail',
  'app.feature-list',
  'app.feature-create',
  'app.profile',
  'app.services',
  'angucomplete-alt',
  'validation.match',
  'toastr'
];

// Mount on window for testing
window.app = angular.module('app', requires)
  .constant('AppConstants', constants)
  .config(appConfig)
  .run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
