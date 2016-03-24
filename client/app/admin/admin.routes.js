angular.module('admin.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            .when('/admin/login', {
                templateUrl: 'app/admin/login/admin-login.html',
                controller: 'adminLogInController',
                controllerAs: 'admin'
            })

             .when('/admin/products', {
                templateUrl: 'app/admin/products/views/admin.productList.html',
                controller: 'admin_ProductController',
                controllerAs: 'product'
            })

            .when('/admin/products/:product_id', {
                templateUrl: 'app/admin/products/views/admin.productDetails.html',
                controller: 'admin_ProductDetailsController',
                controllerAs: 'product'
            })

            .when('/admin/upload/products', {
                templateUrl: 'app/admin/products/views/admin.productUpload.html',
                controller: 'admin_ProductUploadController',
                controllerAs: 'product'
             })

            .when('/admin/products/edit/:product_id', {
                templateUrl: 'app/admin/products/views/admin.productEdit.html',
                controller: 'admin_ProductDetailsController',
                controllerAs: 'product'
            });

        //for pretty URLs
        $locationProvider.html5Mode(true);

    });
