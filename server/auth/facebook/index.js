var express = require('express');
var passport = require('passport');
var router = express.Router();

//For facebook auth login
router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

//implementing callback route after authenticated
router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/products',
            failureRedirect : '/'
        }));

module.exports = router;