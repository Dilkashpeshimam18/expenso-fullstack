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
const premiumRoutes = require('./routes/premium')
const passwordRoutes = require('./routes/password')
const Order = require('./models/order')
const ForgotPasswordRequests = require('./models/forgotpassword')
const incomeRoutes = require('./routes/income')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))
dotenv.config()

app.use('/users', authRoutes)
app.use('/expense', expenseRoutes)
app.use('/purchase', purchasePremiumRoutes)
app.use('/premium', premiumRoutes)
app.use('/password', passwordRoutes)
app.use('/income', incomeRoutes)

Expense.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' })
Users.hasMany(Expense)

Users.hasMany(Order)
Order.belongsTo(Users)

Users.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(Users)

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!!')
    })
}).catch((err) => {
    console.log(err)
})
