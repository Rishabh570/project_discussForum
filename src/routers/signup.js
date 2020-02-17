const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
	, passport = require('../passport/passporthandler');

	router.get('/', (req, res) => {
		res.redirect('/login.html')
	})

router.post('/', async (req, res) => {
	try {
		const user = await findUserByParams({email: req.body.em});
		
		if(user) {
			console.log("User with this e-mail already exists!!!");
		}
		else {
			
			const passhash = await pass2hash(req.body.ps);
		
			const createdUser = await createUserLocal({email: req.body.em, password: passhash,firstName: req.body.fn,
														lastName: req.body.ln, dob: req.body.dob, gender: req.body.gen});
			
			if(!createdUser) {
				console.log("Could not create user. Please try again!!!");
			}
			else {
				// Login after signup automatically
				passport.authenticate('local', {
					failureRedirect: '/signup',
					successReturnToOrRedirect: '/home',
					failureFlash: true
				})
			}
		}
	}
	catch (err) {
		console.log("Error in signup.");
	}
})

module.exports = router;
