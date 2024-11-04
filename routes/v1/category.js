const express = require('express')
const categoryController = require('./../../controllers/v1/category')
const authMiddleWare = require('./../../middlewares/authMiddleWares')
const isAdminMiddleWare = require('./../../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .post(authMiddleWare, isAdminMiddleWare, categoryController.create)
    .get(categoryController.getAll)

router.route('/:id')
    .delete(authMiddleWare, isAdminMiddleWare, categoryController.remove)
    .put(authMiddleWare, isAdminMiddleWare, categoryController.update)


module.exports = router