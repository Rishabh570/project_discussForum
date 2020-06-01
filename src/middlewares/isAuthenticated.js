const verifyUser = () => (req, res, next) => {
	if(req.user) {
		console.log("User is logged in");
		next();
	}
	else {
		console.log("User is NOT logged in!");
		res.redirect('/homebeforelogin.html');
	}
}

module.exports = {
	verifyUser
}
