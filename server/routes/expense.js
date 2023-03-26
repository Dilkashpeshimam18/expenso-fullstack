const express=require('express')
const expenseControllers=require('../controllers/expense')
const {authenticate}=require('../middleware/auth')
const router=express.Router()

router.get('/expense/get-expense',authenticate,expenseControllers.getExpense)
router.post('/expense/add-expense',authenticate,expenseControllers.addExpense)
router.delete('/expense/delete-expense/:id',authenticate,expenseControllers.deleteExpense)

module.exports=router;