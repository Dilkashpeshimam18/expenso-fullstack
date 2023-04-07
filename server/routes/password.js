const express=require('express')
const passwordController=require('../controllers/password')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/resetpassword/:id',passwordController.resetPassword)
router.post('/forgotpassword',passwordController.forgotPassword)

module.exports=router;