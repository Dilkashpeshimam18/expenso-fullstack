const Expense = require('../models/expense')
const Users = require('../models/users')
const { randomUUID } = require('crypto')

exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category} = req.body
        console.log(req.body)
        console.log('USER IS>>>>>',req.user)
        const id=req.user.id
  
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
        console.log('REQUEST USER>>>>',req.user.id)
        const id = req.user.id
        const expenses = await Expense.findAll({where:{usersdbId:id}})
        res.status(200).json({expenses,success:true})
    } catch (err) {
        res.status(500).json({ success: false, message: err })

    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id

        await Expense.destroy({ where: { id: id } })
        res.status(200).json('Deleted Successfully!')
    } catch (err) {
        res.status(500).json({ success: false, message: err })
    }
}