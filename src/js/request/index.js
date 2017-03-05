import angular from 'angular';

// Create the module where our functionality can attach to
let requestModule = angular.module('app.request', []);

// Include our UI-Router config settings
import RequestConfig from './request.config';
requestModule.config(RequestConfig);

// Controllers
import RequestCtrl from './request.controller';
requestModule.controller('RequestCtrl', RequestCtrl);

export default requestModule;
