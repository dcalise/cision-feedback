import angular from 'angular';

let accountDetailModule = angular.module('app.account-detail', []);

import AccountDetailConfig from './account-detail.config';
accountDetailModule.config(AccountDetailConfig);

import AccountDetailCtrl from './account-detail.controller';
accountDetailModule.controller('AccountDetailCtrl', AccountDetailCtrl);

import FeatureList from './components/feature-list/feature-list.component';
accountDetailModule.component('featureList', FeatureList);

export default accountDetailModule;
