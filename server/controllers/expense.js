const Expense = require('../models/expense')
const { randomUUID } = require('crypto')
const sequelize = require('../utils/db')

exports.addExpense = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { amount, description, category } = req.body

        const id = req.user.id

        const data = await Expense.create({
            id: randomUUID(),
            name: description,
            amount: amount,
            category: category,
            usersdbId: id
        }, { transaction: transaction })

        await req.user.update({ total_expense: Number(req.user.total_expense) + Number(amount) }, { transaction: transaction })

        await transaction.commit()
        res.status(200).json('EXPENSE ADDED SUCCESSFULLY!')

    } catch (err) {
        await transaction.rollback()
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getExpense = async (req, res) => {

    try {
        const id = req.user.id
        const expenses = await Expense.findAll({ where: { usersdbId: id } })
        res.status(200).json({ expenses, success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err })

    }
}

exports.deleteExpense = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const id = req.params.id
        const userId = req.user.id

        const exp = await Expense.findByPk(id)
        if (exp.usersdbId == userId) {
            await exp.destroy({ transaction: transaction })
            await transaction.commit()
            return res.status(200).json('Deleted Successfully!')

        } else {
            await transaction.rollback()
            throw new Error('Only the user created this expense can delete this!')

        }


    } catch (err) {
        transaction.rollback()
        res.status(500).json({ success: false, message: err })
    }
}