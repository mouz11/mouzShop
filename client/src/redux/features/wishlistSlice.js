import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    numberOfProducts: 0,
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addProductToWishlist: (state, action) => {
            if (!state.products.some(p => p._id === action.payload._id)){
                state.numberOfProducts += 1
                state.products.push(action.payload)
            }
        },
        removeProductFromWishlist: (state, action) => {
            state.numberOfProducts -= 1
            const p = state.products.find(p => p._id === action.payload)
            state.products = state.products.filter(p => p._id !== action.payload)
            if (state.products.length === 0){
                state.totalPrice = 0;
            }
        },
        reset: (state, action) => {
            state.products = []
            state.numberOfProducts = 0
        },
    },
})

export const { addProductToWishlist, removeProductFromWishlist, reset} = wishlistSlice.actions

export default wishlistSlice.reducer
