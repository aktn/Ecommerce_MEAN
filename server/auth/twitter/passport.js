var twitterStrategy = require('passport-twitter').Strategy;
var User       = require('../../api/user/user.model'); //Setting user model

var configOAuth = require('../../config/OAuth'); //For getting App Keys 

module.exports = function(passport) {

    //Serialising user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //Deserializing user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
   
    // Twitter Auth ================================================================
    passport.use(new twitterStrategy({

        consumerKey     : configOAuth.twitterAuth.consumerKey,
        consumerSecret  : configOAuth.twitterAuth.consumerSecret,
        callbackURL     : configOAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function() {
                //check whether Twitter ID is already existing or not
                User.findOne({ 
                    'twitter.id' : profile.id 
                }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if no user, create them
                        var newUser            = new User();

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

        });


    }));
};