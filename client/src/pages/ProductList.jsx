import React, {useEffect, useState} from 'react';
import Announcements from "../components/Announcements.jsx";
import Navbar from "../components/Navbar.jsx";
import Products from "../components/Products.jsx";
import NewsLetter from "../components/NewsLetter.jsx";
import Footer from "../components/Footer.jsx";
import {useLocation, useSearchParams} from "react-router-dom";

const colors = [
    {
        name: "White",
        value: "white",
    },
{
        name: "Black",
        value: "black",
    },
{
        name: "Red",
        value: "red",
    },
{
        name: "Blue",
        value: "blue",
    },
{
        name: "Yellow",
        value: "yellow",
    },
{
        name: "Green",
        value: "green",
    },

]
const sizes = [
    {
        name: "XS",
        value: "XS",
    },
{
        name: "S",
        value: "S",
    },
{
        name: "M",
        value: "M",
    },
{
        name: "L",
        value: "L",
    },
{
        name: "XL",
        value: "XL",
    },

]

function ProductList(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({color: "", size:""})
    const [sort, setSort] = useState("1")
    const [query, setQuery] = useState("")

    useEffect(() => {
        setQuery(searchParams.get("query"))
    }, []);

    const handleFilters = (e)=>{
        const value = e.target.value;
        if (e.target.name === "sort"){
            setSort(value)
        }else {
            setFilters({...filters, [e.target.name]: value})
        }
    }
    return (
        <div>
            {/*<Navbar />*/}
            {/*<Announcements />*/}
            <div>
                <h1 className={"text-3xl font-bold sm:p-[20px] p-[16px]"}>{cat || "Dresses"}</h1>
                <div className={"flex justify-between p-[20px] md:flex-row flex-col gap-y-4"}>
                    <div className={"flex justify-between gap-3"}>
                        <p style={{minWidth: '150px'}} className={"text-[20px] flex-1 font-semibold"}>filter Products: </p>
                        <select name={"color"} onChange={(e)=>handleFilters(e)} className={"outline-none w-[100px] text-[18px] border border-black"}>
                            <option value={"default"} selected disabled>Color</option>
                            {colors.map(color=>(
                                <option value={color.value} key={color.name}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                        <select value={"default"} name={"size"} onChange={(e)=>handleFilters(e)} className={"outline-none w-[100px] text-[18px] border border-black"}>
                            <option value={"default"} disabled>Size</option>
                            {sizes.map(size=>(
                                <option value={size.value} key={size.name}>
                                    {size.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"flex justify-between gap-3"}>
                        <p className={"text-[20px] font-semibold"}>sort Products: </p>
                        <select onChange={handleFilters} name={"sort"} className={"outline-none w-[100px] text-[18px] border border-black"}>
                            <option value={"1"}>Newest</option>
                            <option value={"priceasc"}>Price(asc)</option>
                            <option value={"pricedesc"}>Price(desc)</option>
                        </select>
                    </div>
                </div>
                <Products cat={cat} filters={filters} sort={sort} query={query} />
                <NewsLetter />
                <Footer />
            </div>
        </div>
    );
}

export default ProductList;
