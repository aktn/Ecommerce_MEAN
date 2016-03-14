/**
 * Getting the required packages for Authentication 
 */
var express = require('express');
var Admin = require('../../api/admin/admin.model.js');
var path = require('path');
var jwt = require('jsonwebtoken'); //token based Authentication
var config     = require('../../config/env/development');
var superSecret = config.secret; //secret variable string

var apiAdminRouter = express.Router();
apiAdminRouter.post('/', function isAuthenticated(req, res) {
    //Getting admin with the provided username
    Admin.findOne({
        username: req.body.username
    }).select('username name email role password').exec(function(err, user) {

        if (err) throw err;
        //if no admin found
        if (!user) {
            res.json({
                success: false,
                //For security purpose in admin interface
                //exact error message won't be returned
                message: 'Oops..Something went wrong' 
            });
        } else if (user) {
            //if password did not match
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Oops..Something went wrong'
                });
            } else {
                //if everthing is ok creat the token
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresInMinutes: 60 //token will expire with an hour
                });

                res.json({
                    success: true,
                    message: 'Token can be used!',
                    token: token
                });
            }

        }

    });
});

//middleware router to authenticate the token
apiAdminRouter.use(function(req, res, next) {

    console.log('Somebody just came to our app!'); //testing

    //access token from post parameter or url or in header
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //To decode the token
    if (token) {

        jwt.verify(token, superSecret, function(err, decoded) {

            if (err) {
                res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {

                //token is decoded if it matches
                req.decoded = decoded;
                next(); //to continue to the next route
            }
        });

    } else {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//To get logged in admin's info by decoding the token
apiAdminRouter.get('/me', function(req, res) {
    res.send(req.decoded);
});


module.exports = apiAdminRouter;
