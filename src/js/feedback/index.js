import angular from 'angular';

// Create the module where our functionality can attach to
let feedbackModule = angular.module('app.feedback', []);

// Include our UI-Router config settings
import FeedbackConfig from './feedback.config';
feedbackModule.config(FeedbackConfig);


// Controllers
import FeedbackCtrl from './feedback.controller';
feedbackModule.controller('FeedbackCtrl', FeedbackCtrl);


export default feedbackModule;
