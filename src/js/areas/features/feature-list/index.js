import angular from 'angular';

// Create the module where our functionality can attach to
let featureListModule = angular.module('app.feature-list', []);

// Include our UI-Router config settings
import FeatureListConfig from './feature-list.config';
featureListModule.config(FeatureListConfig);


// Controllers
import FeaturesCtrl from './feature-list.controller';
featureListModule.controller('FeaturesCtrl', FeaturesCtrl);


export default featureListModule;
