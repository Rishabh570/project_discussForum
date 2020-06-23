const express = require('express')
	, router = express.Router()
	, authMiddleware = require('../middlewares/isAuthenticated')
	, {findCardByID} = require('../controllers/card')
	, {findUserById} = require('../controllers/user')
	, {getMessagesByRoomId} = require('../controllers/message')
	, {verifyUser} = require('../middlewares/isAuthenticated')
	, {createMessage} = require('../controllers/message')
	, exp = require('express')
	, app = exp()
	, http = require('http').Server(app)
	, io = require('socket.io')(http);


let cache={};
router.get('/card/data', verifyUser(), async (req, res) => {
	console.log("IN CARD DATA +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
	let roomID = cache[req.user.email];
	console.log("room ID = ", roomID);
	try {
		const roomObj = await findCardByID(roomID);
		console.log("roj ======= ", roomObj);
		const authorObj = await findUserById(roomObj.uid);
		console.log("aoj ======= ", authorObj);
		const messages = await getMessagesByRoomId(roomID);
		console.log("msgs ======= ", messages);
		const authorName = authorObj.firstName + " " + authorObj.lastName;
		let myobj = {
			cardDet: roomObj,		initiator: authorName,
			messages: messages,		user: req.user.firstName+" "+req.user.lastName,
			uid:req.user.email
		};
		res.send(myobj);
	}
	catch(err) {
		console.log("error in opening chatroom");
		throw err;
	}
})

router.get('/card/:cardId', verifyUser(), async (req, res) => {
	cache[req.user.email]=req.params.cardId;
	try {
		res.redirect('/chatroom.html');
	}
	catch(err) {
		console.log("error in opening chatroom");
		throw err;
	}
})





module.exports=router
