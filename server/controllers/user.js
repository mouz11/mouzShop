const CryptoJS = require("crypto-js");
const User = require("../models/User");

const get = async (req,res)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (user) {
            const {password, ...others} = user._doc
            res.status(200).json({
                success: true,
                user: others
            })
        }else{
            res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
    }catch (err){
        res.status(500).json({
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
    try {
        const users = await User.find().sort(sort).limit(limit).select('email username isAdmin')
            res.status(200).json({
                success: true,
                count: users.length,
                users: users
            })

    }catch (err){
        res.status(500).json({
            error: err.message
        })
    }
}
const update = async (req,res)=>{
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        const id = req.params.id
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: req.body
            }, {new: true})
            const {password, ...others} = updatedUser._doc
            return res.status(201).json({
                success: true,
                message: "update successful",
                user: others
            })
        }catch (err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
const remove = async (req,res)=>{
    const id = req.params.id
    try {
        const deletedUser = await User.findByIdAndRemove(id)
        if (!deletedUser){
            res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
        const {password, ...others} = deletedUser._doc
        res.status(200).json({
            success: true,
            deletedUser: others
        })
    }catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const stat = async (req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data = await User.aggregate([{
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


module.exports = {update, remove, get, getAll, stat}
