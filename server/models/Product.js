const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    desc : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    categories : {
        type: Array,
    },
    size : {
            type: Array,
    },
    color : {
        type: Array,
    },
    price : {
        type: Number,
        required: true,
    },
    inStock : {
        type: Boolean,
        default: true
    }
}, {timestamps: true})
// module.exports = mongoose.model('Product', productSchema)
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
