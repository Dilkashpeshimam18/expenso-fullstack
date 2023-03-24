const Expense = require('../models/expense')
const Users = require('../models/users')
const { randomUUID } = require('crypto')

exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category, email } = req.body
        console.log(req.body)
        const user = await Users.findOne({ where: { email: email } })
        const userId = user.id
        const data = await Expense.create({
            id: randomUUID(),
            name: description,
            amount: amount,
            category: category,
            usersdbId: userId
        })
        res.status(200).json('EXPENSE ADDED SUCCESSFULLY!')
    } catch (err) {
        console.log(err)
    }
}

exports.getExpense = async (req, res) => {
    try {
        const id = req.params.id
        const expenses = await Expense.findAll({ where: { usersdbId: id } })
        res.status(200).json({ expenses })
    } catch (err) {
        console.log(err)
    }
}