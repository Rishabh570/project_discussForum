const express = require('express')
	, router = express.Router()
	, {createUserLocal} = require('../controllers/user');

router.get('/', (req, res) => {
	res.send("SIGNUP");
})

router.post('/', async (req, res) => {
	let query = {
		f_name: req.body.f_name,
		l_name: req.body.l_name,
		email: req.body.email
	}

	const resp = await createUserLocal(query);
	res.sendStatus(200);
})

module.exports = router;