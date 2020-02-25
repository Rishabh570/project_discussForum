const express = require('express')
	, router = express.Router()
	, authMiddleware = require('../middlewares/isAuthenticated');




	router.get('/', authMiddleware.verifyUser, (req, res) => {
		res.redirect('/homeafterlogin.html');
	})
	

module.exports=router
