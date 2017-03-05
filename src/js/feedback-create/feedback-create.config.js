function FeedbackCreateConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.feedback-create', {
    url: '/feedback/create',
    controller: 'FeedbackCreateCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'feedback-create/feedback-create.html',
    title: 'Create New Feedback Request'
  });

};

export default FeedbackCreateConfig;
