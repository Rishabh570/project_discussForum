const express = require('express')
	, router = express.Router()
    , passport = require('passport');

router.get('/', (req, res) => {
    res.redirect('LDlogin.html')
})

router.post('/', passport.authenticate('local', {
	failureRedirect: '/login'
}), (req, res) => {
	res.redirect('/');
})

module.exports = router;
