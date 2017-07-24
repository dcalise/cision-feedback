import angular from 'angular';

// Create the module where our functionality can attach to
let featuresModule = angular.module('app.feature-list', []);

// Include our UI-Router config settings
import FeaturesConfig from './features.config';
featuresModule.config(FeaturesConfig);


// Controllers
import FeaturesCtrl from './features.controller';
featuresModule.controller('FeaturesCtrl', FeaturesCtrl);


export default featuresModule;
