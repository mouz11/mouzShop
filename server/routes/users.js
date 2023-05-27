const express = require('express')
const authMiddleware = require('../middlewares/auth')
const validationMiddleware = require('../middlewares/validation')
const userController = require('../controllers/user')
const {verifyAdmin} = require("../middlewares/validation");

const Router = express.Router()

Router.get('/', authMiddleware, validationMiddleware.verifyAdmin, userController.getAll)
Router.get('/stats',authMiddleware, verifyAdmin, userController.stat)
Router.get('/:id', authMiddleware, validationMiddleware.alterUserPrivilege, userController.get)
Router.put('/:id', authMiddleware, validationMiddleware.alterUserPrivilege, validationMiddleware.updateUserValidation, userController.update)
Router.delete('/:id', authMiddleware, validationMiddleware.alterUserPrivilege, userController.remove)
module.exports = Router
