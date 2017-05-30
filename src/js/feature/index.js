import angular from 'angular';

// Create the module where our functionality can attach to
let featureModule = angular.module('app.feature', []);

// Include our UI-Router config settings
import FeatureConfig from './feature.config';
featureModule.config(FeatureConfig);

// Controllers
import FeatureCtrl from './feature.controller';
featureModule.controller('FeatureCtrl', FeatureCtrl);

import Comment from './comment.component';
featureModule.component('comment', Comment);

export default featureModule;
