const express = require('express')
const authMiddleWare = require('./../../middlewares/authMiddleWares')
const isAdminMiddleWare = require('./../../middlewares/isAdmin')
const commentsController = require('./../../controllers/v1/comment')
const router = express.Router()

router.route("/").post(authMiddleWare, commentsController.create)

module.exports = router