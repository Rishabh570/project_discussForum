db = require('../db/db');

async function createCard(query) {
    let mycard;
    try {
        mycard = await db.cards.create({
			keywords: query.keyvalues,
			description: query.description,
			uid:query.uid
		})
    } catch (err) {
        throw new Error('Unsuccessful creation. Please try again.')
	}
    return mycard;
}

async function findCardByKeyWord(params) {
	try {
		const resp = await db.cards.findOne({
			where:  {keywords: params.keyvalues}
		})
		return resp;
	}
	catch(err) {
		console.log(err);
	}
}
async function getAllCards() {
	try {
		const resp = await db.cards.findAll()
		return resp;
	}
	catch(err) {
		console.log(err);
	}
}

async function findCardByID(ID) {
	try {
		const resp = await db.cards.findOne({
			where: {cid: ID}
		})
		return resp;
	}
	catch(err) {
		console.log("error in controller for getting card by ID");
		throw err;
	}
}

async function getRecentlyCreatedCards() {
	try {
		return await db.cards.findAll({
			order: [
				['cid', 'DESC'],
			]
		});
	}
	catch(err) {
		throw err;
	}
}

async function updateCardLastMsg(cardId, lastMsgId) {
	try {
		let cardObj = await findCardByID(cardId);
		cardObj.lastMsg = lastMsgId;
		await cardObj.save();
	}
	catch(err) {
		console.log("Error in updateCardLastMsg");
		throw err;
	}
}

module.exports = {
	createCard,
	getAllCards,
	findCardByKeyWord,
	findCardByID,
	getRecentlyCreatedCards,
	updateCardLastMsg
}
