function AccountListConfig($stateProvider) {
    'ngInject';

    $stateProvider.state('app.account-list', {
        url: '/accounts',
        controller:  'AccountListCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'areas/accounts/account-list/account-list.html',
        title: 'Accounts',
        resolve: {
            currentAuth: (AuthService, $state) => {
                if (!auth.emailVerified) {
                    $state.go('app.profile');
                }
                return auth;
            },
            profile: (UserService, AuthService) => {
                return AuthService.$requireSignIn().then(auth => {
                    return UserService.getProfile(auth.uid).$loaded();
                });
            }
        }
    });
}

export default AccountListConfig;
