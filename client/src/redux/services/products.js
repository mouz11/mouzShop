import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_BASE_URL}/api`,
    }),
    endpoints : (builder) => ({
        getProducts: builder.query({query: (cat) => cat ? `/products?category=${cat}` : `/products`},),
        getSingleProduct: builder.query({query: (id) => `/products/${id}`}),
    })
})

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi

