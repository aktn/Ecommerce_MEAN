var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validate') //For validation certain types Eg.email

//Defining schema for User
var UserSchema = new Schema({
    //For local email signUp
    local          : {
        name       : String,
        email      : { type: String, validate: [validate.email, 'invalid email address'] , index: { unique: true }}, //To set unique
        password   : String
    },
    //For facebook login
     facebook        : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

//Hashing the user's password before saving
UserSchema.pre('save', function(next){
    var user = this;

    //Hash only if the password has been changed
    //if(!user.isModified('password')) return next();

    bcrypt.hash(user.local.password, null, null, function(err, hash){
        if(err) res.send(err);
        user.local.password = hash;
        next();
    });
});

//To compare hash password from the database
UserSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);



