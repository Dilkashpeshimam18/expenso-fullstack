const Razorpay = require('razorpay')
const { randomUUID } = require('crypto')
const Order = require('../models/order')

exports.purchasePremium = async (req, res, next) => {
  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500
    razorpay.orders.create({ amount: amount, currency: 'INR' }, (err, order) => {
      if (err) {
        console.log(err)
        throw new Error(JSON.stringify(err))
      }
      console.log('ORDER IS>>>>', order)

      console.log('ORDER ID IS>>>>>', order.id)

      req.user.createOrder({ id: randomUUID(), orderId: order.id, status: 'PENDING' }).then(() => {
        return res.status(200).json({ order, key_id: razorpay.key_id })
      })
        .catch((err) => {
          console.log(err)
          throw new Error(err)
        })
    })

  } catch (err) {
    console.log(err)
    res.status(403).json({ success: false, error: err })
  }

}

exports.updateTransaction = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body

    const paymentDetail = await Order.findOne({ where: { orderId: orderId } })

    const promise1 = paymentDetail.update({ paymentId: paymentId, status: 'SUCCESSFUL' })

    const promise2 = req.user.update({ isPremiumUser: true })
    await Promise.all([promise1, promise2])
    return res.status(200).json({ success: true, message: 'Transcation Successful' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, err })
  }

}