//To connect to the database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining data structure for Product
var productSchema = new Schema({
    title       : { type: String,  trim:true},
    price       : { type: Number },
    stock       : { type: Number, default: 1},
    description : String,
    category	: String,
    imageBin    : { data: Buffer, contentType: String},
    imageUrl    : String
});

module.exports = mongoose.model('Product',productSchema);