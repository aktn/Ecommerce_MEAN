angular.module('adminCtrl', ['adminAuthService'])

    .controller('adminLogInController', function($rootScope, $location, adminAuth) {

        var adminLoginCtrl = this;
        //check if admin is already logged in
        adminLoginCtrl.loggedIn = adminAuth.isLoggedIn();

        //check whether admin is logged in or not when changes in route
        $rootScope.$on('$routeChangeStart', function() {
            adminLoginCtrl.loggedIn = adminAuth.isLoggedIn();

            //getting logged in admin's information
            adminAuth.getUser()
                .then(function(data) {
                    adminLoginCtrl.user = data.data;
                });
        });

        //Login processing part
        adminLoginCtrl.adminLogin = function() {
            adminLoginCtrl.processing = true;

            //removing if there are any errors
            adminLoginCtrl.error = '';

            //Asking information for logging in
            adminAuth.login(adminLoginCtrl.data.username, adminLoginCtrl.data.password)
                .success(function(data) {
                    adminLoginCtrl.processing = false;

                    //redirecting to admin's page, if auth was success
                    if (data.success)
                        $location.path('/admin/products');
                    else
                        adminLoginCtrl.error = data.message;

                });
        };

        //Logging out process
        adminLoginCtrl.doLogout = function() {
            adminAuth.logout();
            adminLoginCtrl.user = '';

            $location.path('/login');
        };


    });