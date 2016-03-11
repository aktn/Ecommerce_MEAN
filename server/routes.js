var path = require('path');

module.exports = function(app) {
	//API Routes
    app.use('/api/users', require('./api/user'));
    app.use('/api/products', require('./api/product'));
    app.use('/api/admin', require('./api/admin'));
};