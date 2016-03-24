angular.module('adminProductCtrl',['adminProductService'])

    .controller('admin_ProductController', function(Product){
        var productCtrl = this;
        productCtrl.processing = true;

        //To retrieve all the product lists
        Product.all()
            .success(function(data){
                productCtrl.processing = false;
                productCtrl.products = data;
            });

        //Deleting the selected product
        productCtrl.deleteProduct = function(id){
            productCtrl.processing = true; //set the processing mode to true
            productCtrl.message = ''; //clear the message

            Product.delete(id)
                .success(function(data){
                    //refresh the product data after deleting
                    Product.all()
                        .success(function(data){
                            productCtrl.processing = false;
                            productCtrl.products = data;       
                        });
                });
        };
    })

    //uploading the product
    .controller('admin_ProductUploadController', function(Product){
        var upload = this;
        upload.type = 'create';

        upload.saveProduct = function(){
            upload.processing = true;
            upload.message = '';

            Product.create(upload.productData)
                .success(function(data){
                    upload.processing = false;
                    upload.productData = {};
                    //message information after uploading the product
                    upload.message = data.message;
                });
            };
    })

    //For editing the product
    .controller('admin_ProductDetailsController', function($routeParams, Product) {

        var edit = this;

        //To get the particular product
        Product.get($routeParams.product_id)
            .success(function(data) {
                edit.productData = data;
            });

        //To edit the product
        edit.type = 'edit';
        edit.editProduct = function() {
            edit.processing = true;

            edit.message = '';

            //getting the product ID to edit from the route
            Product.update($routeParams.product_id,edit.productData)
                .success(function (data) {
                    edit.processing = false;
                    edit.productData = {};
                    edit.message = data.message;
                });
        };
    });