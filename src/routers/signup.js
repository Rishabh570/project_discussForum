const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
	, passport = require('passport');

	router.get('/', (req, res) => {
		res.redirect('../public/login.html')
	})

router.post('/', async (req, res) => {
	try {
		const user = await findUserByParams({username: req.body.username});
		if(user) {
			console.log("User already exists!!!");
		}
		else {
			const passhash = await pass2hash(req.body.password);
			const createdUser = await createUserLocal({username: req.body.username, password: passhash});
			if(!createdUser) {
				console.log("Could not create user. Please try again!!!");
			}
			else {
				// Login after signup automatically
				passport.authenticate('local', {
					failureRedirect: '/signup',
					successReturnToOrRedirect: '/home',
					failureFlash: true
				})(req, res)
			}
		}
	}
	catch (err) {
		console.log("Error in signup.");
	}
})

module.exports = router;
