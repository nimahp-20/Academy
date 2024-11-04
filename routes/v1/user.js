const express = require('express')
const userController = require('./../../controllers/v1/user')
const authMiddleWare = require('./../../middlewares/authMiddleWares')
const isAdminMiddleWare = require('./../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .get(authMiddleWare, isAdminMiddleWare, userController.getAll)
    .put(authMiddleWare, userController.updateUser)
router.route("/ban/:id").post(authMiddleWare, isAdminMiddleWare, userController.banUser)
router.route("/changeRole").put(authMiddleWare, isAdminMiddleWare, userController.changeRole)
router.route("/:id").delete(authMiddleWare, isAdminMiddleWare, userController.deleteUser)

module.exports = router