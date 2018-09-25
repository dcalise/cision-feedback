import angular from 'angular';

// Create the module where our functionality can attach to
let accountListModule = angular.module('app.account-list', []);

// Include our UI-Router config settings
import AccountListConfig from './account-list.config';
accountListModule.config(AccountListConfig);


// Controllers
import AccountListCtrl from './account-list.controller';
accountListModule.controller('AccountListCtrl', AccountListCtrl);


export default accountListModule;
