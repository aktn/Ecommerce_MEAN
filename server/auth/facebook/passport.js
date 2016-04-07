var FacebookStrategy = require('passport-facebook').Strategy;
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
    
    // Facebook Auth ================================================================
    passport.use(new FacebookStrategy({

        clientID        : configOAuth.facebookAuth.clientID,
        clientSecret    : configOAuth.facebookAuth.clientSecret,
        callbackURL     : configOAuth.facebookAuth.callbackURL,
        profileFields   : ['id', 'name', 'email'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            // check whether user has logged in or not
            if (!req.user) {
                //check whether Facebook ID is already existing or not
                User.findOne({ 
                    'facebook.id' : profile.id 
                }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if userID exists but no token 
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in
                var user            = req.user; // pull the user out from session
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });
            }
        });

    }));
};