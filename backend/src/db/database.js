const sequelize = require('sequelize')

module.exports = new sequelize('db', 'founder', 'ksksrrpj01@', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
});
