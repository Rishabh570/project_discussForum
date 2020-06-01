const express = require('express')
	, router = express.Router()
	, {findKeywords} = require('../controllers/search')
	, {verifyUser } = require('../middlewares/isAuthenticated');

router.post('/', verifyUser(), async (req, res) => {
	try {
		const resp = await findKeywords(req.body.query);
		res.send(resp);
	}
	catch(err) {
		console.log("err in search.js in controller");
		throw err;
	}
})



module.exports = router;
