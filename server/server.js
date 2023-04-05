const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expense')
const sequelize = require('./utils/db')
const Expense = require('./models/expense')
const Users = require('./models/users')
const purchasePremiumRoutes = require('./routes/purchase')
const premiumRoutes=require('./routes/premium')
const passwordRoutes=require('./routes/password')
const Order = require('./models/order')
const ForgotPasswordRequests = require('./models/forgotpassword')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.use('/users',authRoutes)
app.use('/expense',expenseRoutes)
app.use('/purchase', purchasePremiumRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',passwordRoutes)

Expense.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' })
Users.hasMany(Expense)


Users.hasMany(Order)
Order.belongsTo(Users)
Users.hasMany(ForgotPasswordRequests)

sequelize.sync({force:true}).then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!!')
    })
}).catch((err) => {
    console.log(err)
})
