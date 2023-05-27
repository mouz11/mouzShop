const Cart = require("../models/Cart")

const get = async (req,res)=>{
    const userId = req.params.id
    try{
        const cart = await Cart.findOne({
            userId
        })
        if (cart){
            return res.status(200).json({
                success: true,
                cart
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const getAll = async (req,res)=>{
    try{
        const carts = await Cart.find()
        return res.status(200).json({
            success: true,
            carts
        })

    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const create = async (req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        return res.status(200).json({
            success: true,
            savedCart
        })
    }catch (err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const update = async (req,res)=>{
    const id = req.params.id;
    try{
        const updatedCart = await Cart.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        if (updatedCart){
            return res.status(200).json({
                success: true,
                updatedCart
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
    }catch (err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const remove = async (req,res)=>{
    const id = req.params.id;
    try{
        const deletedCart = await Cart.findByIdAndRemove(id)
        if (deletedCart){
            return res.status(200).json({
                success: true,
                deletedCart
            })
        }else {
            return res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}


module.exports = {create, update, remove, get, getAll}
