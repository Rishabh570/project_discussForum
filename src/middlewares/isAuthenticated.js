function verifyUser(req, res, next) {
	// console.log("req ", req.session);
    if (req.isAuthenticated()) {
		console.log("User is logged in");
        return next();
    } else {
		console.log("User is NOT logged in!");
        res.redirect('/homebeforelogin.html');
    }
}

module.exports = {
	verifyUser: verifyUser
}
