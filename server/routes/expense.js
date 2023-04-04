const express=require('express')
const expenseControllers=require('../controllers/expense')
const {authenticate}=require('../middleware/auth')
const router=express.Router()

router.get('/get-expense',authenticate,expenseControllers.getExpense)
router.post('/add-expense',authenticate,expenseControllers.addExpense)
router.delete('/delete-expense/:id',authenticate,expenseControllers.deleteExpense)

module.exports=router;