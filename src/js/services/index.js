import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import AccountsService from './accounts.service';
servicesModule.service('Accounts', AccountsService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import FeaturesService from './features.service';
servicesModule.service('Features', FeaturesService);

import AuthService from './auth.service';
servicesModule.service('Auth', AuthService);

import UserService from './user.service';
servicesModule.service('Users', UserService);


export default servicesModule;
