function AdminConfig($stateProvider) {
    'ngInject';

    $stateProvider.state('app.admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'areas/admin/admin.html',
        title: 'Admin',
        resolve: {
            currentAuth: function(AuthService, $state) {
                return AuthService.$requireSignIn().then(auth => {
                    if (!auth.emailVerified) {
                        $state.go('app.profile');
                    }
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

export default AdminConfig;
