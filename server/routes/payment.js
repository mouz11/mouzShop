const express = require('express')
const authMiddleware = require("../middlewares/auth");
const Product = require("../models/Product");
const {router} = require("express/lib/application");
const Router = express.Router()
// const stripe = require('stripe')('sk_test_51NBbVvC8xyBKMUBjS7l5WUnEPMP3pd8R0MSrpMepVrkYpPI2Gnb6xRmfGkEEzdMUJjPCq2JcSlvcyqkyqfOqD2fN00xTSlTbqw')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const Order = require('../models/Order')
const getProducts = async (items)=>{
    // try{
    const products = await Promise.all(items.map(async item=>{
        const product = await Product.findById(item._id)
        if (product){
            return {price : product.price, quantity: item.quantity, name: item.title}
        }else{
            return undefined
        }
    }))
    return products

}

Router.post('/create-checkout-session', async (req, res)=>{
    const address = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(address)
    const items = req.body.data.cart
    let lineItems = [];

    const customer = await stripe.customers.create({metadata: {
        user_id: req.body.data.user._id,
        cart: JSON.stringify(items),
        total: req.body.data.total
    }})

    try {
        const products = await getProducts(items)
        const lineItems = products.map(p=>({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: p.name,
                    images: [p.image],
                    metadata: {id: p._id}
                },
                unit_amount: p.price * 100
            },
            quantity: p.quantity

        }))

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'MA'],
            },
            phone_number_collection: {
                enabled: true
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                }],
            line_items: lineItems,
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.CLIENT}/success`,
            cancel_url: `${process.env.CLIENT}/cancel`,
        });

        res.send({url : session.url});

    }catch (err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        })
    }


})

let endpointSecret;
// const endpointSecret = process..env.WEBHOOK_SECRET;

Router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let eventType;
    let data;

    if(endpointSecret){
        let event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object
        eventType = event.type
    }else {
        data = request.body.data.object
        eventType = request.body.type
    }

    // console.log(eventType)
    // Handle the event
    if (eventType === "payment_intent.succeeded"){
        stripe.customers.retrieve(data.customer).then(customer=>{
            console.log('customersDetails', customer)
            console.log('data' , data)
            createOrder(customer, data, response);
        })
    }

    // switch (event.type) {
    //     case 'payment_intent.succeeded':
    //         const paymentIntentSucceeded = event.data.object;
    //         // Then define and call a function to handle the event payment_intent.succeeded
    //         break;
    //     // ... handle other event types
    //     default:
    //         console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

const createOrder = async (customer, intent, res)=>{

    const products = JSON.parse(customer.metadata.cart).map(({_id, quantity})=>{
        return {
            productId: _id,
            quantity
        }
    })

   const data = {
        userId: customer.metadata.user_id,
        products: products,
        amount: intent.amount /100,
        address: intent.shipping.address,
    }
    const order = new Order(data)
    order.save()
}

function calculateTotalAmount(products) {
    return products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
}


module.exports = Router
