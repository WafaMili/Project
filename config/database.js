const {Sequelize}=require('sequelize');

const sequelize = new Sequelize('Project-test','wafa','123456',{
    host:'localhost',
    dialect:'postgres'
});
module.exports = sequelize;