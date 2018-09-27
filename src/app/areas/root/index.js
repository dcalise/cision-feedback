import angular from 'angular';

// Create the module where our functionality can attach to
let homeModule = angular.module('app.home', []);

// Include our UI-Router config settings
import HomeConfig from './home.config';
homeModule.config(HomeConfig);

// Controllers
import HomeCtrl from './home.controller';
homeModule.controller('HomeCtrl', HomeCtrl);

import FeaturesByStatus from './components/features-by-status/features-by-status.component';
homeModule.component('featuresByStatus', FeaturesByStatus);

import MostValuableFeatures from './components/most-valuable-features/most-valuable-features.component';
homeModule.component('mostValuableFeatures', MostValuableFeatures);

import AccountsByType from './components/accounts-by-type/accounts-by-type.component';
homeModule.component('accountsByType', AccountsByType);

import FeaturesByPlatform from './components/features-by-platform/features-by-platform.component';
homeModule.component('featuresByPlatform', FeaturesByPlatform);

export default homeModule;
