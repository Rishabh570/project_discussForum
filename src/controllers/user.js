db = require('../db/db');

async function createUserLocal(query) {
    let userLocal;
    try {
        userLocal = await db.User.create({
			email: query.email,
			password: query.password,
			firstName:query.firstName,
			lastName: query.lastName, dob: query.dob,
			gender: query.gender
		})
    } catch (err) {
		console.log("error while creating user");
        throw new Error('Unsuccessful registration. Please try again.')
	}
	console.log("user created!");
    return userLocal;
}

async function findUserById(uid) {
    return db.User.findOne({
		where: { uid }
	});
}

async function findUserByParams(params) {
	try {

		const resp = await db.User.findOne({
			where:  {email: params.email}
		})

		return resp;
	}
	catch(err) {
		console.log(err);
	}

}

async function updateUserParticipationData(user, cardId, msgId) {
	try {
		let userString = JSON.stringify(user);
		user = JSON.parse(userString);
		const userID = user.uid;
		let userObj = await findUserById(userID);

		let userParticipatedCards = JSON.parse(userObj.cid);
		if(userParticipatedCards == null) {
			userParticipatedCards = {};
		}
		if(userParticipatedCards[`${cardId}`] == undefined || userParticipatedCards[`${cardId}`] == null) {
			userParticipatedCards[`${cardId}`] = 0;
		}
		else if(userParticipatedCards[`${cardId}`] < 0) {
			userParticipatedCards[`${cardId}`] = msgId;
		}

		userParticipatedCards = JSON.stringify(userParticipatedCards);
		userObj.cid = userParticipatedCards;
		await userObj.save();
		return true;
	}
	catch(err) {
		console.log("Error in controller of user in updateUserParticipationData");
		throw err;
	}
}

async function updateUserLastMsgForCard(user, cardId, msgId) {
	user = JSON.stringify(user);
	user = JSON.parse(user);
	const userID = user.uid;

	try {
		let userObj = await findUserById(userID);
		let userParticipatedCards = JSON.parse(userObj.cid);
		if(userParticipatedCards == null) {
			userParticipatedCards = {};
		}
		if(userParticipatedCards[`${cardId}`] == undefined || userParticipatedCards[`${cardId}`] == null) {
			userParticipatedCards[`${cardId}`] = -msgId;
		}
		else if(userParticipatedCards[`${cardId}`] >= 0) {
			userParticipatedCards[`${cardId}`] = msgId;
		}
		else if(userParticipatedCards[`${cardId}`] < 0) {
			userParticipatedCards[`${cardId}`] = -msgId;
		}
		userParticipatedCards = JSON.stringify(userParticipatedCards);
		userObj.cid = userParticipatedCards;
		await userObj.save();
		return true;
	}
	catch(err) {
		console.log("Error in updateUserLastMsgForCard");
		throw err;
	}

}



module.exports = {
	createUserLocal,
	findUserById,
	findUserByParams,
	updateUserParticipationData,
	updateUserLastMsgForCard
}
