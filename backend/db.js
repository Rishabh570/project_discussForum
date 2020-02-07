//commands to use  from commandline  after mysql installation  before running this file
//command to start mysql -> mysql -u root -p
//first create db from using this line ->create database db;
//check created db available or not ->show databases;
//then create user by this line -> create user "founder"@"localhost" identified by "ksksrrpj01@";
//check created user available or not ->select user from mysql.user;
//then provide priviledges to founder by this command-> GRANT ALL ON db.* TO 'founder'@'localhost';
//command to revoke priviledges revoke all on db from 'founder'@'localhost';
//to provide,see and remove priviledges on complete sql
//grant all on *.* to 'founder'@'localhost';
//show grants for 'founder'@'localhost';
//revoke all on *.* from 'founder'@'localhost';
const sequelize = require('sequelize')

const db = new sequelize('db', 'founder', 'ksksrrpj01@', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})


const entry=db.define('counts',{ 
    id: {type:sequelize.INTEGER,    autoIncrement: true,    primaryKey: true},
    usercount:{type:sequelize.INTEGER, allowNull:false}, 
    cardcount:{type:sequelize.INTEGER, allowNull:false}
})

const users=db.define('userinfos',{ uid:{type:sequelize.STRING(6)}, 
firstName: {type: sequelize.STRING, allowNull: false}, lastName: { type: sequelize.STRING },
age:{ type:sequelize.INTEGER},  gender: {type:sequelize.STRING(1)}, location: { type:sequelize.STRING},
mobileno:{type:sequelize.STRING(10)}, eduDet:{type:sequelize.STRING}, empDet:{type:sequelize.STRING},
ilink:{type:sequelize.STRING},  cid:{type:sequelize.STRING(6)} });

db.sync().then(() => console.log("Database has been synced")).catch((err) => console.error("Error creating database"))


module.exports={users,entry}
