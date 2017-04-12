import angular from 'angular';

let accountCreateModule = angular.module('app.account-create', []);

import AccountCreateConfig from './account-create.config';
accountCreateModule.config(AccountCreateConfig);

import AccountCreateCtrl from './account-create.controller';
accountCreateModule.controller('AccountCreateCtrl', AccountCreateCtrl);

export default accountCreateModule;