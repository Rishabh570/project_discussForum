const sequelize = require('sequelize')

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
module.exports = new sequelize('sql12344495', 'sql12344495', 'SrgL75SWgi', {
	host: '85.10.205.173',
	port: 3306,
	dialect: 'mysql',
});
