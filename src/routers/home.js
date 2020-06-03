const express = require('express')
	, router = express.Router()
	, passport = require('passport')
	, {verifyUser} = require('../middlewares/isAuthenticated');



	router.get('/', verifyUser(), (req, res) => {
		res.redirect('/homeafterlogin.html');
	})


module.exports=router
