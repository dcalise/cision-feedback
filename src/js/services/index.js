import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import FeaturesService from './features.service';
servicesModule.service('Features', FeaturesService);

export default servicesModule;
