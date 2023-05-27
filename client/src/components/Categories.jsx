import React from 'react';
import {categories} from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
function Categories(props) {
    return (
        <div className={"flex sm:flex-row flex-col sm:p-[20px] p-2 justify-between lg:gap-3 gap-2"}>
            {categories.map(item=>{
                return (
                    <CategoryItem key={item.img} item={item} />
                )
            })}
        </div>
    );
}

export default Categories;
