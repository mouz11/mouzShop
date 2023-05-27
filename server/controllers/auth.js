const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken")
const register = async (req, res)=>{
    const {email, username, password} = req.body;
    const cipherPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
    console.log(CryptoJS.AES.decrypt(cipherPassword, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8))
    const newUser = new User({
        email,
        username,
        password: cipherPassword
    })
    try {
        await newUser.save();
        const {data, password} = newUser
        return res.status(201).json({
            success: true,
            message: "signup successful",
            data: data
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const login = async (req,res)=> {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            email,
        })
        if (!user){
            return res.status(401).json({
                success: false,
                error: "user not found, email or password incorrect"
            })
        }else {
            if (CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8) === password){
                const token = jwt.sign({id:user._id, isAdmin: user.isAdmin, username:user.username}, process.env.JWT_KEY, {expiresIn: '365d'})
                const {password, ...others} = user._doc;
                return res.status(200).json({
                    success: true,
                    user: others,
                    token
                })
            }else{
                return res.status(401).json({
                    success: false,
                    error: "user not found, email or password incorrect"
                })
            }

        }
    }catch (err){
        console.log(err)
        res.status(400).json({
            message: "An error occurred",
            error: err.message
        })
    }
}

const logout = (req,res)=> {
    const token = jwt.sign({id:0, isAdmin: 0, username:0}, process.env.JWT_KEY, {expiresIn: '0d'})
    return res.status(200).json({
                    success: true,
                    token
                })

}

module.exports = {register, login, logout}
