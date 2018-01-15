export default class AuthService {
    constructor($firebaseAuth) {
        'ngInject';

        const auth = $firebaseAuth();

        return auth;
    }
}
