angular.module('userAuthService', [])

    /**
    //Authentication for user login and retrieving user information
    //AuthToken for creating & checking tokens
    */
    .factory('userAuth', function($http, $q, AuthToken) {

        var userAuthFactory = {};

        //For user login
        userAuthFactory.login = function(email, password) {

            //return data from API
            return $http.post('/api/login', {
                email: email,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        //For logging out
        userAuthFactory.logout = function() {
            //destroy the token
            AuthToken.setToken(); 
        };

        //To check whether uesr is login or not
        userAuthFactory.isLoggedIn = function() {
            if (AuthToken.getToken())
                return true;
            else
                return false;
        };

        //grab the current login user
        userAuthFactory.getUser = function() {
            if (AuthToken.getToken())
                return $http.get('/api/login/me', { cache: true });
            else
                return $q.reject({ message: 'Token is not there' });
        };

        return userAuthFactory;

    })
    
    //For storing in token in client's browser
    .factory('AuthToken', function($window) {

        var authUserToken = {};

        //getting the token
        authUserToken.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        //setting & removing the the token 
        authUserToken.setToken = function(token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return authUserToken;

    })

    //For sending token in every request made to the server
    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        var interceptingToken = {};
        interceptingToken.request = function(config) {

            //get to token
            var token = AuthToken.getToken();

            //if available, set it to the header
            if (token)
                config.headers['x-access-token'] = token;

            return config;
        };

        //Errors..
        interceptingToken.responseError = function(response) {

            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }
            return $q.reject(response);
        };

        return interceptingToken;

    });