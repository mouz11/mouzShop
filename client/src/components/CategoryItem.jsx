import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

function CategoryItem({item}) {
    return (
        <div className={"flex-1 w-full relative"} style={{height: "100vh"}}>
            <img className={"w-full h-full object-cover"} src={item.img}/>
            <div className={"absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"}>
                <h1 className={"text-center text-white lg:mb-2 mb-6 lg:text-5xl text-3xl font-semibold ease"}>{item.title}</h1>
                <Link to={`/products/${item.cat}`}>
                    <button className={"text-gray-300 text-xl hover:text-white border-gray-300 hover:border-white border p-2"}>SHOP NOW</button>
                </Link>
            </div>
        </div>
    );
}

export default CategoryItem;
