const Router = require('express').Router()
const AuthController = require('../controllers/auth')
const validationMiddleware = require('../middlewares/validation')
//REGISTER
Router.post('/register', validationMiddleware.signup, AuthController.register)
Router.post('/login', validationMiddleware.login, AuthController.login)
Router.post('/logout', AuthController.logout)

module.exports =  Router
