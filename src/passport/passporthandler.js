/* PASSPORT LOCAL AUTHENTICATION */

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {findUserByParams, createUserLocal} = require('../controllers/user')
const bcrypt = require('bcrypt')

passport.serializeUser(function (user, done) {
    done(null, user.email)
})

passport.deserializeUser(async function (username, done) {
	try {
		const user =await findUserByParams({email:username});
		if(!user) {
			return done(new Error("No such user"))
		}
		return done(null, user);
	}
	catch (err){
		done(err)
	}
})

passport.use(new LocalStrategy(async function (username, password, done) {

	try {
		const user = await findUserByParams({email:username});
        if (!user) {
            return done(null, false, {message: "No such user"})
		}

		bcrypt.compare(password, user.password, (err, matches) => {
			if(matches) {
				console.log("finally user = ", user.password);
				return done(null, user)
			}
			console.log("not machted");
			return done(null, false, {message: "Wrong password"})
		})
	}
	catch(err){
        return done(err)
    }
}))

exports= module.exports = passport


