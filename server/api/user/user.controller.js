var User = require('./user.model');
var path = require('path');
var jwt = require('jsonwebtoken'); //token based Authentication
var config     = require('../../config/env/development');

//For returning all the registered users
exports.index = function(req, res){
    User.find({}, function(err, users){
        if(err) res.send(err);
        res.json(users);
    });
};

//For displaying a certain user
exports.show = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) res.send(err);
        res.json(user);
    });
};

//Creating new user
exports.create = function(req, res){
    var user = new User();
    user.local.name = req.body.name;
    user.local.email = req.body.email;
    user.local.password = req.body.password;

    user.save(function(err){
        if (err){
            // If user already exists
            if (err.code == 11000) 
                return res.json({ 
                    success: false, 
                    message: 'User with that email already exists'
                });
            else 
                return res.send(err);
        }
        res.json({message: 'User has been created! Please Login'});
    });
};

//Updating user
exports.update = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) res.send(err);
        //Will update only if one of the following has changed
        if(req.body.name) user.local.name = req.body.name;
        if(req.body.email) user.local.email = req.body.email;
        if(req.body.password) user.local.password = req.body.password;

        user.save(function(err){
            if(err) res.send(err);
            res.json({message: "User has been updated!"});
        });
    });
};

//Deleting user
exports.destroy = function(req, res) {
    User.remove({
        _id: req.params.id
    },function(err){
        if(err) res.send(err);
        res.json({message : 'User has been deleted!'});
    });
};



