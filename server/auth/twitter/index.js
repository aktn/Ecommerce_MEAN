var express = require('express');
var passport = require('passport');
var router = express.Router();

//For twitter login
router.get('/twitter', passport.authenticate('twitter'));

//Twitter login callback after authenticated	
router.get('/twitter/callback', passport.authenticate('twitter', {
	successRedirect : '/products',
	failureRedirect : '/'
}));

module.exports = router;