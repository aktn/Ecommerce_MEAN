angular.module('admin.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            .when('/admin/login', {
                templateUrl: 'app/admin/login/admin-login.html',
                controller: 'adminLogInController',
                controllerAs: 'admin'
            });

        //for pretty URLs
        $locationProvider.html5Mode(true);

    });
