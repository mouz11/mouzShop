const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/orders')
const paymentRouter = require('./routes/payment')
const cors = require('cors')


const app = express();
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//db connexion
mongoose.connect(process.env.DATABASE_URL,{})

//setting some headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({})
    }
    next()
})


app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payment', paymentRouter)



app.use((error, req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})

module.exports = app

