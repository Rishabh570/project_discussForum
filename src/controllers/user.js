db = require('../db/db');

async function createUserLocal(query) {
    let userLocal;
    try {
        userLocal = await db.users.create({
			username: query.username,
			password: query.password
		})
    } catch (err) {
		console.log("error while creating user");
        throw new Error('Unsuccessful registration. Please try again.')
	}
	console.log("user created!");
    return userLocal;
}

async function findUserById(uid) {
    return db.users.findOne({
		where: { uid }
	});
}

async function findUserByParams(params) {
	try {
		const resp = await db.users.findOne({
			where:  {username: params.username}
		})
	}
	catch(err) {
		console.log(err);
	}
	return resp;
}


module.exports = {
	createUserLocal,
	findUserById,
	findUserByParams
}
