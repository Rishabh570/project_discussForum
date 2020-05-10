const express = require('express')
	, router = express.Router()
	, db = require('../db/db')
	, {verifyUser} = require('../middlewares/isAuthenticated')
	, {findCardByID} = require('../controllers/card');


router.get('/participated', verifyUser, async (req, res) => {
	try {
		let currentUser = req.user;
		currentUser = JSON.stringify(currentUser);
		currentUser = JSON.parse(currentUser);
		let cards = JSON.parse(currentUser.cid);
		cardsIDs = Object.keys(cards);

		let resp = [];
		(async () => {
			for(let i=0; i<cardsIDs.length; i++) {
				const cardObj = await findCardByID(cardsIDs[i]);
				resp.push(cardObj);
			}
			res.send(resp);
		})()
	}
	catch(err) {
		console.log("Failed to get participated cards!");
		throw err;
	}
})

router.get('/', (req, res) => {
	db.Users.findAll()
	.then(users => {
		res.send(users);
		res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
	})
})




module.exports = router;
