const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
	, passport = require('passport');

	router.get('/', (req, res) => {
		res.render('newlogin')
	})

	router.post('/', async (req, res, next) => {
	
		try {
			const user = await findUserByParams({email: req.body.username});
			
			if(user) {
				console.log("User with this e-mail already exists!!!");
			}
			else {
				const passhash = await pass2hash(req.body.password);
				
				let dob= (req.body.db)+"/"+(req.body.mb)+"/"+(req.body.yb);
				const createdUser = await createUserLocal({email: req.body.username, password: passhash,firstName: req.body.firstname,
															lastName: req.body.lastname, dob:dob, gender: req.body.gen});
				
				if(!createdUser) {
					console.err("Could not create user. Please try again!!!");}
				else{	next();	}}
			}
			catch (err) {
			console.log("Error in signup.");}
	},
	passport.authenticate('local', {
		failureRedirect: '/signup',
		successReturnToOrRedirect: '/home'
	}))
	
	module.exports = router;
