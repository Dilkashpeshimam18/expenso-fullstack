const Expense = require('../models/expense')
const Users = require('../models/users')
const { randomUUID } = require('crypto')

exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body

        const id = req.user.id

        const data = await Expense.create({
            id: randomUUID(),
            name: description,
            amount: amount,
            category: category,
            usersdbId: id
        })
        res.status(200).json('EXPENSE ADDED SUCCESSFULLY!')
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getExpense = async (req, res) => {
    try {
        console.log('REQUEST USER>>>>', req.user.id)
        const id = req.user.id
        const expenses = await Expense.findAll({ where: { usersdbId: id } })
        res.status(200).json({ expenses, success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err })

    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id

        Expense.findByPk(id).then((exp) => {
            if (exp.usersdbId == userId) {
                exp.destroy()
                return res.status(200).json('Deleted Successfully!')

            } else {
                throw new Error('Only the user created this expense can delete this!')

            }
        })

    } catch (err) {
        res.status(500).json({ success: false, message: err })
    }
}