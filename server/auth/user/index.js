/**
 * Getting the required packages for Authentication 
 */
var express = require('express');
var User = require('../../api/user/user.model.js');
var path = require('path');
var jwt = require('jsonwebtoken'); //token based Authentication
var config     = require('../../config/env/development');
var superSecret = config.secret; //secret variable string

var apiRouter = express.Router();
apiRouter.post('/', function isAuthenticated(req, res) {
    //Getting the user with the provided email address
    User.findOne({
        'local.email': req.body.email
    }).select('local.name local.email local.password').exec(function(err, user) {

        if (err) throw err;
        //if no user with the provide email not found
        if (!user) {
            res.json({
                success: false,
                message: 'User with that email does not exist'
            });
        } else if (user) {
            //if password did not match
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Invalid password.'
                });
            } else {
                //if everthing is ok creat the token
                var token = jwt.sign({
                    name: user.local.name,
                    email: user.local.email
                }, superSecret, {
                    expiresInMinutes: 120 //token will expire in 2 hours
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
apiRouter.use(function(req, res, next) {

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

//To get logged in user's info by decoding the token
apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

module.exports = apiRouter;

