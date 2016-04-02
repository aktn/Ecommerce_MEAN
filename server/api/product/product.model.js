//To connect to the database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining data structure for Product
var productSchema = new Schema({
	_id         : mongoose.Schema.Types.ObjectId,
    title       : { type: String,  trim:true},
    price       : { type: Number },
    stock       : { type: Number, default: 1},
    description : String,
    category	: String,
    imageBin    : { data: Buffer, contentType: String},
    imageUrl    : String
}).index({  //backend search will search againt title & description
  	'title': 'text',
  	'description': 'text'
	});

module.exports = mongoose.model('products',productSchema);