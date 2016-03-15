angular.module('userLogInCtrl', ['userAuthService'])

    .controller('userLogInController', function($rootScope, $location, userAuth) {

        var client = this;
        //check if client is already logged in
        client.loggedIn = userAuth.isLoggedIn();

        //check whether logged in or not when changes in route 
        $rootScope.$on('$routeChangeStart', function() {
            client.loggedIn = userAuth.isLoggedIn();

            //getting logged in user information
            userAuth.getUser()
                .then(function(data) {
                    client.user = data.data;
                });
        });

        //Login process
        client.doLogin = function() {
            client.processing = true;

            //removing any errors
            client.error = '';

            //Getting information for login
            userAuth.login(client.loginData.email, client.loginData.password)
                .success(function(data) {
                    client.processing = false;

                    //redirecting to products display page if auth was success
                    if (data.success)
                        $location.path('/products');
                    else
                        client.error = data.message;
                });
        };

        //Logging out process
        client.doLogout = function() {
            userAuth.logout();
            client.user = '';
            $location.path('/login');
        };

    });
