import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import AccountService from './accounts.service';
servicesModule.service('AccountService', AccountService);

import CommentService from './comments.service';
servicesModule.service('CommentService', CommentService);

import FeatureService from './features.service';
servicesModule.service('FeatureService', FeatureService);

import LabelService from './labels.service';
servicesModule.service('LabelService', LabelService);

import AuthService from './auth.service';
servicesModule.service('AuthService', AuthService);

import PagerService from './pager.service';
servicesModule.service('PagerService', PagerService);

import UserService from './user.service';
servicesModule.service('UserService', UserService);

export default servicesModule;
