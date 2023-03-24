const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expense')
const sequelize = require('./utils/db')
const Expense = require('./models/expense')
const Users = require('./models/users')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(authRoutes)
app.use(expenseRoutes)

Expense.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' })
Users.hasMany(Expense)

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!!')
    })
}).catch((err) => {
    console.log(err)
})
