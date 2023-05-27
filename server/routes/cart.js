const express = require('express')
const cartController = require('../controllers/cart')
const authMiddleware = require('../middlewares/auth')
const validationMiddleware = require("../middlewares/validation");
const Router = express.Router()

Router.get('/', authMiddleware,validationMiddleware.verifyAdmin,cartController.getAll)
Router.get('/:userId', authMiddleware, validationMiddleware.alterUserPrivilege,cartController.get)
Router.post("/",authMiddleware, cartController.create)
Router.put('/:id', authMiddleware, validationMiddleware.alterCartPrivilege, cartController.update)
Router.delete('/:id', authMiddleware, validationMiddleware.alterUserPrivilege, cartController.remove)

module.exports = Router
