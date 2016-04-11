var Product = require('./product.model');
var path = require('path'); // For creating paths
var multiparty = require('multiparty'),
    fs = require('fs-extra');//File System that will help to move images between file uploads

//Returning all the products
exports.index = function(req, res){
    Product.find({}, function(err, products) {
        if (err) res.send(err);
        res.json(products);
    });
};

//Returning particular products
exports.show = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) res.send(err);
        res.json(product);
    });
};

//Creating new products
exports.create = function(req, res) {
    var item = new Product();

    //get the image file
    var file = req.files.file;
    //console.log("User " + " is submitting " , file); FOR TESTING

    //creating temporary path
    var tempPath = file.path;
    //point to the full folder dir that will store the image
    var targetPath = path.join(__dirname, "../../../client/assets/uploads/" + file.name);
    //For saving image path name in DB
    var savePath = "/assets/uploads/" + file.name;
    //Uploading file with help of File System
    fs.rename(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            //save the image path
            item.imageUrl = savePath;
            item.save(function(err){
                    if (err){
                        console.log("failed save")
                        res.json({status: 500})
                    } else {
                        console.log("save successful");
                        res.json({message: 'Product Image Added !'});
                    }
                })
        }
    })
};

//Updating products
exports.update = function(req, res){
    Product.findById(req.params.id, function(err, item) {

        if (err) res.send(err);
        //Will update only if one of the following has changed
        if (req.body.title) item.title = req.body.title;
        if (req.body.stock) item.stock = req.body.stock;
        if (req.body.price) item.price = req.body.price;
        if (req.body.description) item.description = req.body.description;
        //  if (req.body.imageBin) item.imageBin = req.body.imageBin;
        if (req.body.imageUrl) item.imageUrl = req.body.imageUrl;

        item.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Item has been updated!' });
        });

    });
};

//Deleting products
exports.destroy = function(req, res){
    Product.remove({
        _id: req.params.id
    }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Item Successfully Deleted' });
    });
};

//Backend search
exports.search = function(req, res) {
     Product
        //search against keywords provided by the user
       .find({'$text':{'$search':req.params.term}}) 
       .exec(function (err, products) {
         if(err) { return handleError(res, err); }
         return res.status(200).json(products);
       });
};