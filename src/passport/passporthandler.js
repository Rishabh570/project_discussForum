/* PASSPORT LOCAL AUTHENTICATION */

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passutil = require('../utils/passwordUtils')
const {findUserByParams, createUserLocal} = require('../controllers/user')

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
	
		const user =await findUserByParams({email:username});
        if (!user) {
            return done(null, false, {message: "No such user"})
		}
		let passhash = await passutil.pass2hash(password);
		console.log(password);
        if (passutil.compare2hash(password, user.password)) {
			return done(null, user)
		}
            return done(null, false, {message: "Wrong password"})
	
	}
	catch(err){
        return done(err)
    }
}))

exports= module.exports = passport


