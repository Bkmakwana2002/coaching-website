const express = require('express')
const { authTeacher,registerTeacher, removeFaculty } = require('../controllers/Teacher')
const { Superprotect } = require('../middleware/SuperAuth')
const {protect} = require('../middleware/authTeach');
const {AddVideo, FetchVideos} = require('../controllers/Video')

const router = express.Router()

router.route('/register/user').post(Superprotect, registerTeacher);
router.route('/login/user').post(authTeacher);
router.route('/remove').delete(removeFaculty);
router.route('/Upload-Video').post(AddVideo, protect);

module.exports = router