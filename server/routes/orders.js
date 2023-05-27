const express = require('express')
const authMiddleware = require("../middlewares/auth");
const validationMiddleware = require("../middlewares/validation");
const orderController = require("../controllers/order");
const {verifyAdmin} = require("../middlewares/validation");
const Router = express.Router()

Router.get('/', orderController.getAll)
Router.get('/stats',authMiddleware, verifyAdmin, orderController.stat)
Router.get('/income',authMiddleware, verifyAdmin, orderController.income)
Router.get('/:userId', authMiddleware, validationMiddleware.alterUserPrivilege,orderController.get)
Router.post("/",orderController.create)
Router.put('/:id', authMiddleware, validationMiddleware.verifyAdmin, orderController.update)
Router.delete('/:id', authMiddleware, validationMiddleware.verifyAdmin, orderController.remove)

module.exports = Router
