module.exports = {

    mongo:{
        'database'  : 'mongodb://127.0.0.1/Ecommerce_MEAN'
    },
    port      	: process.env.PORT || 8080,
    seedDB      : false,
    secret      : 'Thisissecret'
};
