import angular from 'angular';

// Create the module where our functionality can attach to
let featureCreateModule = angular.module('app.feature-create', []);

// Include our UI-Router config settings
import FeatureCreateConfig from './feature-create.config';
featureCreateModule.config(FeatureCreateConfig);

// Controllers
import FeatureCreateCtrl from './feature-create.controller';
featureCreateModule.controller('FeatureCreateCtrl', FeatureCreateCtrl);


export default featureCreateModule;
