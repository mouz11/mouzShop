const validator = require('../helpers/validator')
const Cart = require('../models/Cart')
const Order = require('../models/Order')

const signup = async (req, res, next)=>{
    const validationRule = {
        "username" : "required|string|exist:User,username|min:4",
        "email" : "required|string|exist:User,email|email",
        "password" : "required|string|strict|min:6"
    }
    await validator(req.body, validationRule, {}, (errors, status)=>{
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: errors
            })
        }else {
            next()
        }
    }).catch(err=>{
        console.log(err)
    })
}
const login = async (req,res,next)=>{
    const validationRule = {
        "email" : "required",
        "password" : "required"
    }
    await validator(req.body, validationRule, {}, (errors, status)=>{
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: errors
            })
        }else {
            next()
        }
    }).catch(err=>{
        console.log(err)
    })
}
const alterUserPrivilege = (req,res, next)=>{
        const id = req.params.id

        if (req.userData.id === id || req.userData.isAdmin){
            next()
        }else{
            res.status(403).json({
                success: false,
                message: 'you are not allowed to alter this resource'
            })
        }
}
const alterCartPrivilege = async(req,res, next)=>{
        const id = req.params.id
        const cart = await Cart.findById(id)
        const userId = cart.userId

        if (req.userData.id === userId || req.userData.isAdmin){
            next()
        }else{
            res.status(403).json({
                success: false,
                message: 'you are not allowed to alter this resource'
            })
        }
}
const alterOrderPrivilege = async(req,res, next)=>{
        const id = req.params.id
        const order = await Order.findById(id)
        const userId = order.userId

        if (req.userData.id === userId || req.userData.isAdmin){
            next()
        }else{
            res.status(403).json({
                success: false,
                message: 'you are not allowed to alter this resource'
            })
        }
}
const createOrderRight = async(req,res, next)=>{
        const userId = req.body.userId;

        if (req.userData.id === userId || req.userData.isAdmin){
            next()
        }else{
            res.status(403).json({
                success: false,
                message: 'you are not allowed to alter this resource'
            })
        }
}

const updateUserValidation = async (req, res, next) => {
    const validationRule = {
        "username" : "string|exist:User,username|min:4",
        "email" : "string|exist:User,email|email",
        "password" : "string|strict|min:6"
    }
    await validator(req.body, validationRule, {}, (errors, status)=>{
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: errors
            })
        }else {
            next()
        }
    }).catch(err=>{
        console.log(err)
    })
}
const verifyAdmin = (req,res, next)=>{
    if (req.userData.isAdmin){
        next();
    }else {
        return res.status(403).send({
            success: false,
            error: "Unauthorized to alter the resource"
        })
    }
}
module.exports = {
    signup,
    login,
    alterUserPrivilege,
    updateUserValidation,
    verifyAdmin,
    alterCartPrivilege,
    alterOrderPrivilege,
    createOrderRight
}
