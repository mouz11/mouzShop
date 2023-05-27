import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {Link} from "react-router-dom";
import {addProductToCart} from "../redux/features/cartSlice.js";
import {useDispatch} from "react-redux";
import {addProductToWishlist} from "../redux/features/wishlistSlice.js";


function Product({item}) {
    const dispatch = useDispatch()
    const handleFav = () => {
        dispatch(addProductToWishlist({...item}))
    }
    return (
        <div className={"flex-1 min-w-[300px] h-[400px] flex items-center justify-center relative group"} style={{backgroundColor: "#f5fbfd"}}>
            <div className={"w-[200px] h-[200px] rounded-[50%] bg-white absolute"}>
            </div>
            <img src={item.image} alt={"product"} className={"h-[80%] z-20"}/>
            <div className={"absolute w-full h-full top-0 left-0 items-center justify-center z-30 hidden group-hover:flex ease duration-300 cursor-pointer"} style={{backgroundColor: "rgba(0,0,0,0.2)"}}>
                <div className={"ease duration-300 w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center m-[10px] hover:bg-[#e9f5f5] hover:scale-110 cursor-pointer"}>
                    <ShoppingCartOutlinedIcon />
                </div>
                <div className={"ease duration-300 w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center m-[10px] hover:bg-[#e9f5f5] hover:scale-110 cursor-pointer"}>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlinedIcon />
                    </Link>
                </div>
                <div className={"ease duration-300 w-[40px] h-[40px] rounded-[50%] bg-white flex items-center justify-center m-[10px] hover:bg-[#e9f5f5] hover:scale-110 cursor-pointer"}>
                    <FavoriteBorderOutlinedIcon onClick={handleFav} />
                </div>
            </div>
        </div>
    );
}

export default Product;
