const express=require('express')
const expenseControllers=require('../controllers/expense')
const router=express.Router()

router.get('/expense/get-expense/:id',expenseControllers.getExpense)
router.post('/expense/add-expense',expenseControllers.addExpense)

module.exports=router;