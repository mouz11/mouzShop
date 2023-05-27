import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { productsApi } from './services/products'
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'
import wishlistReducer from './features/wishlistSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({user:userReducer, cart:cartReducer, wishlist: wishlistReducer, [productsApi.reducerPath]: productsApi.reducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(productsApi.middleware),
})

export let persistor = persistStore(store)
setupListeners(store.dispatch)

