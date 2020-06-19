const Sequelize = require('sequelize')

/**
 * THIS IS FOR DEVELOPMENT
 * UN-COMMENT THIS DURING DEVELOPING ON LOCAL
 */
// module.exports = new sequelize('db', 'founder', 'ksksrrpj01@', {
// 	host: 'localhost',
// 	dialect: 'mysql',
// });


/**
 * THIS IS THE PRODUCTION DATABASE
 */
// module.exports = new sequelize('heroku_42d990be20d6c89', 'b6419cb2460fc8', '85937b9d', {
// 	host: "us-cdbr-east-05.cleardb.net",
// 	// host: '34.197.221.243',
// 	dialect: 'mysql',
// 	port: 3306,
// });

// module.exports = new sequelize('mysql://b6419cb2460fc8:85937b9d@us-cdbr-east-05.cleardb.net/heroku_42d990be20d6c89?reconnect=true');

let db;
if (process.env.DATABASE_URL) {
	console.log("1111111111111")
	db = new Sequelize('mysql://b6419cb2460fc8:85937b9d@us-cdbr-east-05.cleardb.net/heroku_42d990be20d6c89?reconnect=true');
}
else {
	console.log("2222222222222")
	db = new Sequelize('heroku_42d990be20d6c89', 'b6419cb2460fc8', '85937b9d', {
			host: "us-cdbr-east-05.cleardb.net",
			dialect: 'mysql',
			port: 3306,
	});
}


module.exports = {
	db
};