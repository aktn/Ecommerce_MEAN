angular.module('productCtrl',['productService'])

    .controller('productController', function(Product){
        var prodcuts = this;

        //to show products are loading from the server
        prodcuts.processing = true;

        //Retrieve all the products
        Product.all()
            .success(function(data){

                //set to false when products are successfully loaded
                prodcuts.processing = false;
                //to display back to frontend interface
                prodcuts.products = data;
            });

    })

    .controller('productDetailsController', function($routeParams, Product) {

        var product = this;

        //Getting particular product ID data from the route and return back the data
        Product.get($routeParams.product_id)
            .success(function(data) {
                product.productData = data;
            });
    });



