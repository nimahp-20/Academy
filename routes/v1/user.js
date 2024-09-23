const express = require('express')
const userController = require('./../../controllers/v1/user')
const authMiddleWare = require('./../../middlewares/authMiddleWares')
const isAdminMiddleWare = require('./../../middlewares/isAdmin')

const router = express.Router()

router.route("/ban/:id").post(authMiddleWare, isAdminMiddleWare, userController.banUser)

module.exports = router