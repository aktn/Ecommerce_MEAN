angular.module('product.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            //route for displaying list of products page
            .when('/products', {
                templateUrl: 'app/products/views/product-list.html',
                controller: 'productController',
                controllerAs: 'product'
            })

            //route for displaying single product information page
            .when('/products/:product_id', {
                templateUrl: 'app/products/views/product-details.html',
                controller: 'productDetailsController',
                controllerAs: 'product'
            });

        //for pretty URLs
        $locationProvider.html5Mode(true);

    });
