const express=require('express')
const expenseControllers=require('../controllers/expense')
const router=express.Router()

router.post('/expense/add-expense',expenseControllers.addExpense)

module.exports=router;