const express = require('express')
const { authUser,registerUser, removeUser2 } = require('../controllers/User2')
const { protect2 } = require('../middleware/User2Protect')

const router = express.Router()

router.route('/register/user2').post(registerUser);
router.route('/login/user2').post(authUser);
router.route('/remove').delete(removeUser2);

module.exports = router