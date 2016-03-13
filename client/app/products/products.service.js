angular.module('productService', [])

    .factory('Product', function($http){

        var productFactory = {};

        //retrieve all products
        productFactory.all = function(){
            return $http.get('/api/products/');
        };

        //retrieve single product
        productFactory.get = function(id) {
            return $http.get('/api/products/'+id);
        };


        return productFactory;
    });