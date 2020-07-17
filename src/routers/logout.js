const express = require('express')
	, router = express.Router()
	, {verifyUser} = require('../middlewares/isAuthenticated.js');


router.get('/', verifyUser(), function(req, res){
	res.cookie('session', req.cookies.session, {maxAge: 0});
	req.session = null;
	req.logout();
	res.redirect('/login');
});


module.exports = router;
