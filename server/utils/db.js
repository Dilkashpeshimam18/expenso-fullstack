const Sequelize=require('sequelize')


const sequelize=new Sequelize('usersdb','root','dilkashsql786',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;