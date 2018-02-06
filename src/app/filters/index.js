import angular from 'angular';

let filtersModule = angular.module('app.filters', []);

import FeaturesFilter from './features.filter';
filtersModule.filter('featuresFilter', FeaturesFilter);

export default filtersModule;
