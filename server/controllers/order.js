const Order = require("../models/Order")
const Product = require("../models/Product");
const Stripe = require('stripe');
const User = require("../models/User");
const stripe = Stripe('sk_test_51Mj9HDBiXFUnx1gbJ8T6zTHD81BYUKbjDj3DCqpdm3S1qMte7e9y2CDzpg18dtx2DFM6qskyjx22pdWsOZSFNs3Y00slsACSnk');
const get = async (req,res)=>{
    const userId = req.params.userId
    try{
        const orders = await Order.find({
            userId
        })
            return res.status(200).json({
                success: true,
                orders
            })
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const getAll = async (req,res)=>{
    const query = req.query
    const sort = {}
    let limit = null
    if (query.new) {
        sort.createdAt = Number.parseInt(query.new)
    }
    if (query.limit){
        limit = Number.parseInt(query.limit)
    }
    try{
        const orders = await Order.find().populate('userId', 'username').sort(sort).limit(limit)
        return res.status(200).json({
            success: true,
            orders
        })

    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const create = async (req,res)=>{
    let amount = 0;
    for (const product of req.body.products) {
        // console.log(product)
        const temp = await Product.findById(product._id);
        amount += (temp.price * product.quantity)
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount*100,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save()
        return res.status(200).json({
            clientSecret: paymentIntent.client_secret
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
        const updatedOrder = await Order.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        if (updatedOrder){
            return res.status(200).json({
                success: true,
                updatedOrder
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
        const deletedOrder = await Order.findByIdAndRemove(id)
        if (deletedOrder){
            return res.status(200).json({
                success: true,
                deletedOrder
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
const stat = async (req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data = await Order.aggregate([{
            $match: {createdAt: {$gte: lastYear}}
        },{
            $project: {
                month: {$month: "$createdAt"}
            }
        },{
            $group: {
                _id: "$month",
                total: {$sum: 1}
            }
        }])
        res.status(200).json({
            success: true,
            data
        })
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
//GET MONTHLY INCOME
const income = async(req,res)=>{
    const productId = req.query.productId
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([{
            $match:{createdAt: {$gte: previousMonth} ,...(productId && {products: {$elemMatch: {_id: productId}}})}
        },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                }
            },{
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        console.log(income)
        res.status(200).json({
            success: true,
            income
        })
    }catch (err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        })
    }

}

module.exports = {create, update, remove, get, getAll, stat, income}
