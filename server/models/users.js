const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const Users = sequelize.define('usersdb', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isPremiumUser: Sequelize.STRING
})

module.exports = Users