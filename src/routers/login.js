const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
    , passport = require('../passport/passporthandler');

router.get('/', (req, res) => {
    res.render('newlogin')
})

router.post('/', passport.authenticate('local', {
	failureRedirect: '/signup'
}), (req, res) => {
	req.session.trendingCount = [];
	req.session.save(() => {
		res.redirect('/');
	})
})

module.exports = router;
