function FeatureListConfig($stateProvider) {
    'ngInject';

    $stateProvider.state('app.feature-list', {
        url: '/features',
        controller: 'FeatureListCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'areas/features/feature-list/feature-list.html',
        title: 'Features',
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

export default FeatureListConfig;
