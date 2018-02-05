import angular from 'angular';

let filtersModule = angular.module('app.filters', []);

import StatusFilter from './status.filter';
filtersModule.filter('statusFilter', StatusFilter);

export default filtersModule;
