const express = require('express')
const coursesController = require('./../../controllers/v1/course')
const multer = require('multer')
const multerStorage = require('./../../utils/uploader')
const authMiddleWare = require('./../../middlewares/authMiddleWares')
const isAdminMiddleWare = require('./../../middlewares/isAdmin')

const router = express.Router()

router.route('/').post(multer({
    storage: multerStorage, limits: {fileSize: 100000000}
}).single("cover"), authMiddleWare, isAdminMiddleWare, coursesController.create)

router.route('/:id/sessions').post(// multer({
    //     storage: multerStorage,
    //     limits: {fileSize: 100000000}
    // }).single("video"),
    authMiddleWare, isAdminMiddleWare, coursesController.createSession)
router.route('/category/:href').get(coursesController.getCoursesByCategory)

router.route('/:href/:sessionID').get(coursesController.getSessionInfo)

router.route('/sessions').get(coursesController.getAllSessions)

router.route('/sessions/:id').delete(authMiddleWare, isAdminMiddleWare, coursesController.removeSession);

router.route("/:id/register").post(authMiddleWare, coursesController.register)


module.exports = router