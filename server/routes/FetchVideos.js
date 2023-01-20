const express = require('express')
const { fetchVideo,FetchVideosFaculty } = require('../controllers/Video')

const router = express.Router()

router.route('/faculty').post(FetchVideosFaculty)
router.route('/view-video').post(fetchVideo)

module.exports = router