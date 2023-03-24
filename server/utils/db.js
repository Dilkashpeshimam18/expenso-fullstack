const Sequelize=require('sequelize')


const sequelize=new Sequelize('expenso','root','dilkashsql786',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;