module.exports = {

    mongo:{
        'database'  : 'mongodb://127.0.0.1/Ecommerce_MEAN'
    },
    port      	: process.env.PORT || 8080,
    seedDB      : false,  //Seeding data will perform will set to true
    secret      : 'Thisissecret',
    braintree:{
    	merchantId	: 'vjkrmgstpdb5bpbh',
    	publicKey	: '7qmdp2gqzqfjj956',
    	privateKey	: '3760af85f078f0c7c4d3feb7dc19fc41'
  	}
};
