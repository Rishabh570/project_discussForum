const db = require('../db/db')
	, Sequelize = require('sequelize');

async function findKeywords(query) {
	try {
		const resp = await db.cards.findAndCountAll({
			where: {
				keywords: {
					[Sequelize.Op.like]: `%${query}%`
				}
			}
		});
		return resp.rows;
	}
	catch(err) {
		console.log("err occured while finding in search bar backend");
		throw err;
	}
}


module.exports = {
	findKeywords,
}
