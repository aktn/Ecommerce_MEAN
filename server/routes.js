var path = require('path');

module.exports = function(app) {
	//API Routes
    app.use('/api/users', require('./api/user'));
    app.use('/api/products', require('./api/product'));
    app.use('/api/admin', require('./api/admin'));
    app.use('/api/login', require('./auth/user'));
    app.use('/api/admin/login', require('./auth/admin'));
    app.use('/api/payment', require('./api/payment'));
    
};