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
		console.log("error while creating card");
        throw new Error('Unsuccessful creation. Please try again.')
	}
	console.log("card created!");
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


module.exports = {
	createCard,
	getAllCards,
	findCardByKeyWord,
	findCardByID
}
