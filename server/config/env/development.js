module.exports = {

    mongo:{
        'database'  : 'mongodb://127.0.0.1/Ecommerce_MEAN'
    },
    port      	: process.env.PORT || 8080,
    seedDB      : true,  //Seeding data will perform will set to true
    secret      : 'Thisissecret'
};
