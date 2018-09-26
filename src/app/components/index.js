import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import AddAccount from './account-helpers/add-account/add-account.component';
componentsModule.component('addAccount', AddAccount);

import ColumnToggle from './list-helpers/column-toggle.component';
componentsModule.component('columnToggle', ColumnToggle);

import Filters from './list-helpers/filters/filters.component';
componentsModule.component('filters', Filters);

import DisplayLabel from './display-label/display-label.component';
componentsModule.component('displayLabel', DisplayLabel);

export default componentsModule;
