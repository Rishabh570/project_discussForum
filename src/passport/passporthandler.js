const passport = require('passport')
	, UserStrategies = require('./strategies/user/index')
	, {findUserById} = require('../controllers/user');


passport.use(UserStrategies.local)


passport.serializeUser(function (user, cb) {
	try {
		return cb(null, user.uid);
	}
	catch (err) {
		return cb(err, null);
	}
})

passport.deserializeUser((id, cb) => {
    try {
        const user = findUserById(id);
        return cb(null, user);
    } catch (err) {
        return cb(err, null);
    }
})

// passport.transformAuthInfo((info, done) => done(null, info))

module.exports = passport
