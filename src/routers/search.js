const express = require('express')
	, router = express.Router()
	, {findKeywords} = require('../controllers/search');

router.post('/', async (req, res) => {
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
