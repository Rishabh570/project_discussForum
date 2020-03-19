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
router.get('/card/:cardId', verifyUser, async (req, res) => {
	cache[req.user.email]=req.params.cardId;
	console.log(cache[req.user.email]);
	try {
	/*	const roomObj = await findCardByID(roomID);
		const authorObj = await findUserById(roomObj.uid);
		const messages = await getMessagesByRoomId(roomID);
		const authorName = authorObj.firstName + " " + authorObj.lastName;*/
		res.redirect('/chatroom.html');
	}
	catch(err) {
		console.log("error in opening chatroom");
		throw err;
	}
})

router.get('/card/data',async (req, res) => {
	console.log("request came")
	let roomId=cache[req.user.email];
	try {
		const roomObj = await findCardByID(roomID);
		const authorObj = await findUserById(roomObj.uid);
		const messages = await getMessagesByRoomId(roomID);
		const authorName = authorObj.firstName + " " + authorObj.lastName;
		let myobj={cardDet:roomObj,initiator:authorName,messages:messages,user:req.user.firstName+" "+req.user.lastName};
		console.log("sent");
		console.log(myobj);
		res.send(myobj);
	}
	catch(err) {
		console.log("error in opening chatroom");
		throw err;
	}
})



module.exports=router
