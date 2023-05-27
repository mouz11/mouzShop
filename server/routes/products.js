const express = require('express')
const authMiddleware = require("../middlewares/auth");
const validationMiddleware = require("../middlewares/validation");
const productController = require("../controllers/product");
const Router = express.Router()


Router.get('/', productController.getAll)
Router.post('/', authMiddleware, validationMiddleware.verifyAdmin, productController.create)
// Router.get('/stats',authMiddleware, verifyAdmin, userController.stat)
Router.get('/:id', productController.get)
Router.put('/:id', authMiddleware, validationMiddleware.verifyAdmin, productController.update)
Router.delete('/:id', authMiddleware, validationMiddleware.verifyAdmin, productController.remove)

module.exports = Router
