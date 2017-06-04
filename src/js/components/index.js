import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import AddAccount from './account-helpers/add-account/add-account.component';
componentsModule.component('customerList', AddAccount);

import CustomerList from './request-helpers/customer-list.component';
componentsModule.component('customerList', CustomerList);

export default componentsModule;
