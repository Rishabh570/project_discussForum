/* PASSPORT LOCAL AUTHENTICATION */

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {findUserByParams, createUserLocal} = require('../controllers/user')
const bcrypt = require('bcrypt')

passport.serializeUser(function (user, done) {
    done(null, user.email)
})


passport.deserializeUser(async function (email, done) {
	try {
		const user = await findUserByParams({email:email});
		if(!user) {
			return done(new Error("No such user"))
		}
		return done(null, user);
	}
	catch (err){
		done(err)
	}
})

const localLogin = function (username, password, done) {
	console.log("In locallogin start,,,");
	try {
		findUserByParams({email:username})
		.then(user => {
			console.log('user: ', user);

			if (!user) {
				done(null, false, {message: "No such user"})
			}

			bcrypt.compare(password, user.password, (err, matches) => {
				if(err) {
					console.log('err: ', err);
					throw err;
				}
				if(matches) {
					console.log("user found, returning...");
					done(null, user)
				}
				else {
					console.log("not machted");
					done(null, false, {message: "Wrong password"})
				}
			})
		})
		.catch(err => {throw err;})
	}
	catch(err){
        done(err)
    }
}

exports.localLogin = new LocalStrategy({ usernameField: 'email' }, localLogin);
