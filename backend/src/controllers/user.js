db = require('../db/db');

async function createUserLocal(query) {
    let userLocal;
    try {
        userLocal = await db.users.create({firstname: query.f_name, lastname: query.l_name, email: query.email})
    } catch (err) {
		console.log("error while creating user");
        throw new Error('Unsuccessful registration. Please try again.')
    }
    return userLocal;
}


module.exports = {
	createUserLocal
}