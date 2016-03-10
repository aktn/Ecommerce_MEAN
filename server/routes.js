var path = require('path');

module.exports = function(app) {
	//API Routes
    app.use('/api/users', require('./api/user'));
};