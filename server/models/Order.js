const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products : [
        {
            productId: {
                type:String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount : {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema, 'Order');
