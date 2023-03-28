const express = require('express')
const premiumControllers = require('../controllers/premium')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/premiummembership', authenticate, premiumControllers.purchasePremium)
router.post('/updatetransactionstatus', authenticate, premiumControllers.updateTransaction)


module.exports = router;