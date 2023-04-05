const express = require('express')
const { authUser,registerUser, removeUser } = require('../controllers/User')
const { Superprotect } = require('../middleware/SuperAuth')
const {protect} = require('../middleware/auth');

const router = express.Router()

router.route('/register/user').post(Superprotect, registerUser);
router.route('/login/user').post(authUser);
router.route('/remove').delete(removeUser);

module.exports = router