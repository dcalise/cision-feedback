function FeatureCreateConfig($stateProvider) {
    'ngInject';

    $stateProvider.state('app.feature-create', {
        url: '/features/create',
        controller: 'FeatureCreateCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'areas/features/feature-create/feature-create.html',
        title: 'Create New Feature Request',
        resolve: {
            currentAuth: function(AuthService, $state) {
                return AuthService.$requireSignIn().then(auth => {
                    if (!auth.emailVerified) {
                        $state.go('app.profile');
                    }
                    return auth;
                });
            },
            profile: function(UserService, AuthService) {
                return AuthService.$requireSignIn().then(auth => {
                    return UserService.getProfile(auth.uid).$loaded();
                });
            }
        }
    });
}

export default FeatureCreateConfig;
