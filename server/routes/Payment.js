const express = require('express')
const  { checkout,paymentVerification, getKey } = require('../controllers/Payment')
const { protect2 } = require('../middleware/User2Protect')

const router = express.Router()

router.route('/checkout').post(checkout)
router.route('/paymentVerification').post(paymentVerification)
router.route('/getKey').get(protect2,getKey)

module.exports = router