const express = require('express')
	, router = express.Router()
	, {verifyUser} = require('../middlewares/isAuthenticated.js');


router.get('/', verifyUser(), function(req, res){
	console.log("logging out...");
	// req.session=null;
	req.logout();
	res.redirect('/');
});


module.exports = router;
