import React, {useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Announcements from "../components/Announcements.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {reset} from "../redux/features/wishlistSlice.js";
import {removeProductFromWishlist} from "../redux/features/wishlistSlice.js";

const ProductDetails = ({product})=>{
    const dispatch = useDispatch()
    const handleCancel = ()=>{
        dispatch(removeProductFromWishlist(product._id))
    }



    return (<div className={"w-full flex justify-between items-center sm:p-4 p-2 border border-white border-b-gray-200"}>
        <div className={"flex items-center"}>
            <div className={"sm:w-[200px] w-[190px] sm:h-[200px] h-[160px] mr-2"}>
                <img className={"w-full h-full object-cover"} src={product.image} alt={"product"}/>
            </div>
            <div className={"flex flex-col sm:gap-2 gap-1"}>
                <p className={"sm:text-[18px] text-[16px]"}><span className={"font-bold"}>Product: </span>{product.title}</p>
                <p className={"sm:text-[18px] text-[16px]"}><span className={"font-bold"}>ID: </span>{product._id}</p>
                <div className={"sm:w-6 w-4 sm:h-6 h-4 rounded-[50%]"} style={{backgroundColor: product.color}}></div>
            </div>
        </div>
        <div className={"flex flex-col sm:gap-6 gap-4 items-center"}>
            <div>
                <RxCross1 onClick={handleCancel} className={"text-red-500 sm:text-2xl text-[16px] cursor-pointer"}/>
            </div>
            <p className={"sm:text-3xl text-2xl"}>
                ${product.price}
            </p>
        </div>
    </div>)
}
function Wishlist(props) {
    const [up, setUp] = useState(0)
    const wishlist = useSelector(state => state.wishlist)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    // const resett = ()=>{
    //     dispatch(reset())
    // }

    return (
        <div>
            {/*<Navbar />*/}
            {/*<Announcements />*/}
            <div className={"sm:p-[20px] p-[10px] lg:mb-[100px] mb-[150px]"}>
                <h1 className={"text-center text-2xl font-semibold"}>YOUR WISHLIST</h1>
                {/*<p onClick={resett}>reset</p>*/}
                <div className={"flex items-center justify-between lg:mt-[20px] mt-[30px]"}>
                    <Link to={"/products"}>
                        <button className={"sm:p-[10px] p-[6px] text-[18px] border bg-transparent border-black "}>CONTINUE SHOPPING</button>
                    </Link>
                    <div className={"sm:flex hidden gap-x-4"}>
                        <Link to={"/cart"}>
                            <p className={"cursor-pointer underline"}>Sopping Bag({cart.numberOfProducts})</p>
                        </Link>
                        <Link to={"/wishlist"}>
                            <p className={"cursor-pointer underline"}>Your Wishlist({wishlist.numberOfProducts})</p>
                        </Link>
                    </div>
                </div>
                <div className={"flex md:flex-row flex-col  justify-between lg:mt-12 mt-14 items-start"}>
                    <div style={{flex: "3.5"}} className={"flex flex-col gap-y-2"}>
                        {wishlist.products.map(product=>{
                            return <ProductDetails product={product} />
                        })}
                    </div>
                </div>
                <div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;
