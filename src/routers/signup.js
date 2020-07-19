const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
	, passport = require('passport');

	router.get('/', (req, res) => {
		res.redirect('LDsignup.html');
	})

	router.post('/', async (req, res, next) => {

		try {
			const user = await findUserByParams({email: req.body.email});

			if(user) {
				console.log("User with this e-mail already exists!!!");
			}
			else {
				const passhash = await pass2hash(req.body.password);

				const createdUser = await createUserLocal({email: req.body.email, password: passhash,firstName: req.body.firstname,
															lastName: req.body.lastname});

				if(!createdUser) console.err("Could not create user. Please try again!!!")
				else next();
			}
		}
		catch (err) {
			console.log("Error in signup., err = ", err);
		}
	},
	passport.authenticate('local', {
		failureRedirect: '/login',
		successReturnToOrRedirect: '/'
	}))

	module.exports = router;
