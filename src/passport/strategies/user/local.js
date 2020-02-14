/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;
const passUtils = require('../../../utils/passwordUtils')
const db = require('../../../db/db')
const {findUserById, createUserLocal} = require('../../../controllers/user')


module.exports = new LocalStrategy({
	passReqToCallback: true,
}, async function(req, username, password, cb) {
	try {
		const user = await findUserByParams({username: username});
		if(!user) {
			console.log("ERROR: NO USER WITH THIS USERNAME EXISTS!!!");
		}
		else {
			const match = await passUtils.compare2hash(password, user.password);
			if(match) {
				console.log("authenticated in local strategy");
				return cb(null, user);
			}
			else {
				console.log("Could not authenticate in local strategy");
				return cb(null, false);
			}
		}
	}
	catch (err) {
		console.log("error in local strategy");
		return cb(err);
	}
})
