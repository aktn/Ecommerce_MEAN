angular.module('adminProductService', [])

    .factory('Product', function($http){

        var adminProductFactory = {};

        //getting all the product lists
        adminProductFactory.all = function(){
            return $http.get('/api/products/');
        };

        //getting the selected product
        adminProductFactory.get = function(id) {
            return $http.get('/api/products/'+id);
        };

        //updating the produdt
        adminProductFactory.update = function(id, productData) {
            return $http.put('/api/products/'+id,productData);
        };

        //creating the product
        adminProductFactory.create = function(productData){
            return $http.post('/api/products/',productData);
        };

        //deleting
        adminProductFactory.delete = function(id) {
            return $http.delete('/api/products/' + id);
        };

        return adminProductFactory;
    });