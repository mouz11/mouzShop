const Product = require('../models/Product')
const get = async (req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.findById(id)
        if (product){
            return res.status(200).json({
                success: true,
                product
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "resource not found"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        })
    }
}
const getAll = async (req,res)=>{
    const query = req.query
    let filter = {}
    let sort = null
    let limit = null

    if (query.color){
        filter.color = query.color
    }
    if (query.size){
        filter.size = query.size
    }
    if (query.new){
        sort = Number.parseInt(query.new)
    }
    if (query.category){
        filter.categories = {
            $in: [query.category]
        }
    }
    if (query.limit){
        limit = Number.parseInt(query.limit)
    }
    try{
        const products = await Product.find(filter).sort({createdAt: sort}).limit(limit)
            return res.status(200).json({
                success: true,
                products
            })

    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}
const  create= async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        return res.status(200).json({
            success: true,
            savedProduct
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
        const updatedProduct = await Product.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        if (updatedProduct){
            return res.status(200).json({
                success: true,
                updatedProduct
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
        const deletedProduct = await Product.findByIdAndRemove(id)
        if (deletedProduct){
            return res.status(200).json({
                success: true,
                deletedProduct
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


module.exports = {get, getAll, update, remove, create}
