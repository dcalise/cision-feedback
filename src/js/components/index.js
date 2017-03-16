import angular from 'angular';

let componentsModule = angular.module('app.components', []);

// import ShowAuthed from './show-authed.directive';
// componentsModule.directive('showAuthed', ShowAuthed);

import CustomerList from './request-helpers/customer-list.component';
componentsModule.component('customerList', CustomerList);

export default componentsModule;
