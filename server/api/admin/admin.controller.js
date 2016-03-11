var Admin = require('./admin.model');
var path = require('path');

//Getting all the admins
exports.index = function(req, res){
    Admin.find({}, function(err, admins){
        if(err) res.send(err);
        res.json(admins);
    });
};

//Getting particular admin
exports.show = function(req, res){
    Admin.findById(req.params.id, function(err, admin){
        if(err) res.send(err);
        res.json(admin);
    });
};

//Adding new admin
exports.create = function(req, res){
    var admin = new Admin();

    admin.name = req.body.name;
    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.role = req.body.role;
    admin.password = req.body.password;

    admin.save(function(err){
        if(err) res.send(err);
        res.json({message: 'Admin Successfully Created!'});
    });
};

//Updating admin information
exports.update = function(req, res){
    Admin.findById(req.params.id, function(err, admin){

        if(err) res.send(err);

        //Will update only if one of the following has changed
        if(req.body.name) admin.name = req.body.name;
        if(req.body.username) admin.username = req.body.username;
        if(req.body.email) admin.email = req.body.email;
        if(req.body.role) admin.role = req.body.role;
        if(req.body.password) admin.password = req.body.password;

        admin.save(function(err){
            if(err) res.send(err);
            res.json({message : 'Information has been updated!'});
        });
    });
};

//Deleting admin data
exports.destroy = function(req, res){
    Admin.remove({
        _id: req.params.id
    }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Admin has been Deleted' });
    });
};
