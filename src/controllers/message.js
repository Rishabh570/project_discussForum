const db = require('../db/db');

async function getMessagesByRoomId(roomID) {
	try {
		const resp = await db.messages.findAll({
			where: {cid: roomID}
		})
		console.log("[In msg controller] Messages are =>> ", resp);
		return resp;
	}
	catch(err) {
		console.log("Error in controller while fetching messages for the chatroom");
		throw err;
	}
}

async function createMessage(query) {
	try {
		const resp = await db.messages.create({
			message: query.message,
			author: query.author,
			cid: query.roomID
		});
		console.log("MESSAGE CREATED!");
		return resp;
	}
	catch(err) {
		console.log("Error in controller while saving message for the current chatroom");
		throw err;
	}
}


module.exports = {
	getMessagesByRoomId,
	createMessage,
}
