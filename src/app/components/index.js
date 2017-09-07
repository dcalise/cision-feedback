import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import AddAccount from './account-helpers/add-account/add-account.component';
componentsModule.component('addAccount', AddAccount);

import CustomerList from './request-helpers/customer-list.component';
componentsModule.component('customerList', CustomerList);

import DisplayLabel from './display-label/display-label.component';
componentsModule.component('displayLabel', DisplayLabel);

export default componentsModule;
