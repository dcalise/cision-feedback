import angular from 'angular';

// Create the module where our functionality can attach to
let feedbackCreateModule = angular.module('app.feedback-create', []);

// Include our UI-Router config settings
import FeedbackCreateConfig from './feedback-create.config';
feedbackCreateModule.config(FeedbackCreateConfig);


// Controllers
import FeedbackCreateCtrl from './feedback-create.controller';
feedbackCreateModule.controller('FeedbackCreateCtrl', FeedbackCreateCtrl);


export default feedbackCreateModule;
