function RequestConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.request', {
    url: '/request',
    controller: 'RequestDetailCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'request/request.html',
    title: 'Request Detail'
  });

};

export default RequestConfig;
