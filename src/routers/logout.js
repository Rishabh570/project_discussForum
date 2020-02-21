const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
    , passport = require('../passport/passporthandler');


router.get('/', function(req, res){
	console.log("logging out...");
	req.logout();
	res.redirect('/');
});


module.exports = router;
