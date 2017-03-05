function FeedbackConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feedback', {
    url: '/feedback',
    controller: 'FeedbackCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feedback/feedback.html',
    title: 'Feedback'
  });

};

export default FeedbackConfig;
