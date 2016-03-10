var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//Defining schema for User
var UserSchema = new Schema({
    name : String,
    email : { type: String},
    password : {type: String, select:false}
});

//Hashing the user's password before saving
UserSchema.pre('save', function(next){
    var user = this;

    //Hash only if the password has been changed
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) res.send(err);
        user.password = hash;
        next();
    });
});

//To compare hash password from the database
UserSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);



