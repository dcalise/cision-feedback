import angular from 'angular';

let filtersModule = angular.module('app.filters', []);

import FeaturesFilter from './features.filter';
filtersModule.filter('featuresFilter', FeaturesFilter);

filtersModule.filter('isDefined', () => {
  return (items) => {
    if (items) {
      const filtered = [];
      items.forEach(item => {
        if (item.$id !== 'undefined') {
          filtered.push(item);
        }
      });
      return filtered;
    }
  }
});

export default filtersModule;
