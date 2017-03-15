import angular from 'angular';
import * as firebase from "firebase";
import 'angularfire';

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
import './home';
import './feature';
import './features';
import './feature-create';
import './profile';
import './article';
import './services';


// Create and bootstrap application
const requires = [
  'ui.router',
  'firebase',
  'templates',
  'app.auth',
  'app.layout',
  'app.components',
  'app.home',
  'app.feature',
  'app.features',
  'app.feature-create',
  'app.profile',
  'app.article',
  'app.services'
];

// Mount on window for testing
window.app = angular.module('app', requires)
  .constant('AppConstants', constants)
  .config(appConfig)
  .run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
