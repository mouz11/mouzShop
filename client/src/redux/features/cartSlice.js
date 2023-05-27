import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    numberOfProducts: 0,
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            if (!state.products.some(p=> p._id === action.payload._id)){
                state.numberOfProducts += 1
                state.products.push(action.payload)
                state.totalPrice += action.payload.price * action.payload.quantity
            }

        },
        removeProductFromCart: (state, action) => {
            state.numberOfProducts -= 1
            const p = state.products.find(p => p._id === action.payload)
            state.totalPrice -= p.price * p.quantity
            state.products = state.products.filter(p => p._id !== action.payload)
            if (state.products.length === 0){
                state.totalPrice = 0;
            }
        },
        adjustProductQuantity: (state, action) => {
            const p = state.products.find(p => p._id === action.payload.id)
            p.quantity += action.payload.amount
            state.totalPrice += p.price * action.payload.amount
        },
        reset: (state, action) => {
            state.products = []
            state.numberOfProducts = 0
            state.totalPrice = 0

        },
    },
})

export const { addProductToCart, removeProductFromCart, adjustProductQuantity, reset } = cartSlice.actions

export default cartSlice.reducer
