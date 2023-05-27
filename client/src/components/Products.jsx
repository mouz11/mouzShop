import React, {useEffect, useState, useRef} from 'react';
import {popularProducts} from "../data.js";
import Product from "./Product.jsx";
import {useGetProductsQuery} from "../redux/services/products.js";
function Products({cat, filters, sort, query}) {

    const [filteredProducts, setFilteredProducts] = useState([])
    // ifz (!query) query="";

    const { data, error, isLoading } = useGetProductsQuery(cat)

    useEffect(()=>{
        data?.products && setFilteredProducts(data.products)
    }, [data])

    // useEffect(()=>{
    //     data?.products && setFilteredProducts(data.products.filter(item => !filters || Object.entries(filters).every(([key, value])=> !value.length || item[key].includes(value))).filter(item=>query.length===0 ? true : item.title.includes(query.toLowerCase()) || item.desc.includes(query.toLowerCase())))
    // },[])

    // if (sort === "1"){
    //     filteredProducts.length && setFilteredProducts(prevState => [...prevState].sort((a,b)=>a.createdAt - b.createdAt))
    // }else if(sort==="priceasc"){
    //     filteredProducts.length && setFilteredProducts(prevState => [...prevState].sort((a,b)=>a.price - b.price))
    // }
    // else if(sort==="pricedesc"){
    //     filteredProducts.length && setFilteredProducts(prevState => [...prevState].sort((a,b)=>b.price - a.price))
    // }

    return (
        <div className={"p-[20px] flex w-full flex-wrap gap-4"}>
            {cat ? filteredProducts?.map(item=>{
                return (
                    <Product key={item.img} item={item} />
                )
            }) : (query &&query.length === 0 ? data?.products.slice(0, 8).map(item=>{
                return (
                    <Product key={item.img} item={item} />
                )
            }) : filteredProducts?.map(item=>{
                return (
                    <Product key={item.img} item={item} />
                )
            }))
            }
        </div>
    );
}

export default Products;
