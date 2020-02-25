db = require('../db/db');

async function createCard(query) {
    let mycard;
    try {
        mycard = await db.cards.create({
			keywords: query.keyvalues,
			description: query.description,	
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


module.exports = {
	createCard,
	findCardByKeyWord
}
