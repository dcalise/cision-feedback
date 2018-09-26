import angular from 'angular';

// Create the module where our functionality can attach to
let featureListModule = angular.module('app.feature-list', []);

// Include our UI-Router config settings
import FeatureListConfig from './feature-list.config';
featureListModule.config(FeatureListConfig);

// Controllers
import FeatureListCtrl from './feature-list.controller';
featureListModule.controller('FeatureListCtrl', FeatureListCtrl);

export default featureListModule;
