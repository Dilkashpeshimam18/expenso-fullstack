const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expense')
const sequelize = require('./utils/db')
const Expense = require('./models/expense')
const Users = require('./models/users')
const premiumRoutes = require('./routes/premium')
const Order = require('./models/order')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.use(authRoutes)
app.use(expenseRoutes)
app.use('/purchase', premiumRoutes)

Expense.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' })
Users.hasMany(Expense)


Users.hasMany(Order)
Order.belongsTo(Users)

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!!')
    })
}).catch((err) => {
    console.log(err)
})
