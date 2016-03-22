angular.module('adminAuthService', [])
    
    /**
    //Authentication for admin login and retrieving admin information
    //AuthToken for creating & checking tokens
    */
    .factory('adminAuth', function($http, $q, AuthToken) {

        var authFactory = {};
        authFactory.login = function(username, password) {

            //POST in backend node
            return $http.post('/api/admin/login', {
                username: username,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        //For logging out
        authFactory.logout = function() {
            AuthToken.setToken();
        };

        //To check whether uesr is login or not
        authFactory.isLoggedIn = function() {
            if (AuthToken.getToken())
                return true;
            else
                return false;
        };

        //grab the current login admin info
        authFactory.getUser = function() {
            if (AuthToken.getToken())
                return $http.get('/api/me', { cache: true });
            else
                return $q.reject({ message: 'User has no token.' });
        };

        return authFactory;

    })

    //For storing in token in client side 
    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

        //getting the token
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        //setting and removing the token
        authTokenFactory.setToken = function(token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return authTokenFactory;

    })

    //For sending token in every request made to the server
    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        var authInterceptorFactory = {};
        authInterceptorFactory.request = function(config) {

            var token = AuthToken.getToken();

            if (token)
                config.headers['x-access-token'] = token;

            return config;
        };

        //If there is an error..
        authInterceptorFactory.responseError = function(response) {

            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }

            return $q.reject(response);
        };

        return authInterceptorFactory;

    });