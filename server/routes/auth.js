const express=require('express')
const authControllers=require('../controllers/auth')
const router=express.Router()

router.post('/users/signup',authControllers.postSignup)

module.exports=router