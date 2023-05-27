import React, {useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Announcements from "../components/Announcements.jsx";
import Footer from "../components/Footer.jsx";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {adjustProductQuantity, removeProductFromCart, reset} from "../redux/features/cartSlice.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import '../../dotenv';


const ProductDetails = ({product})=>{
    const dispatch = useDispatch()
    const handleCancel = ()=>{
        dispatch(removeProductFromCart(product._id))
    }

    const handleQuantity = (op)=> {
        if (op === "-"){
            if (product.quantity !== 1){
                dispatch(adjustProductQuantity({id : product._id, amount : -1}))
            }
        }else if(op === "+"){
            if (product.quantity !== 4){
                dispatch(adjustProductQuantity({id : product._id, amount : 1}))
            }
        }
    }

    return <div className={"w-full flex justify-between items-center sm:p-4 p-2 border border-white border-b-gray-200"}>
        <div className={"flex items-center"}>
            <div className={"sm:w-[200px] w-[190px] sm:h-[200px] h-[160px] mr-2"}>
                <img className={"w-full h-full object-cover"} src={product.image} alt={"product"}/>
            </div>
            <div className={"flex flex-col sm:gap-2 gap-1"}>
                <p className={"sm:text-[18px] text-[16px]"}><span className={"font-bold"}>Product: </span>{product.title}</p>
                <p className={"sm:text-[18px] text-[16px]"}><span className={"font-bold"}>ID: </span>{product._id}</p>
                <div className={"sm:w-6 w-4 sm:h-6 h-4 rounded-[50%]"} style={{backgroundColor: product.color}}></div>
                <p className={"sm:text-[18px] text-[16px]"}><span className={"font-bold"}>Size: </span>{product.size}</p>
            </div>
        </div>
        <div className={"flex flex-col sm:gap-6 gap-4 items-center"}>
            <div>
                <RxCross1 onClick={handleCancel} className={"text-red-500 sm:text-2xl text-[16px] cursor-pointer"}/>
            </div>
            <div className={"flex gap-x-2 items-center sm:text-xl text-[16px]"}>
                <RemoveIcon onClick={()=>handleQuantity("-")} className={"cursor-pointer text-gray-500 hover:text-black"}/>
                <span className={"p-2"}>{product.quantity}</span>
                <AddIcon onClick={()=>handleQuantity("+")} className={"cursor-pointer text-gray-500 hover:text-black"} />
            </div>
            <p className={"sm:text-3xl text-2xl"}>
                ${product.price * product.quantity}
            </p>
        </div>
    </div>
}
function Cart(props) {
    const [up, setUp] = useState(0)
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    // const resett = ()=>{
    //     dispatch(reset())
    // }

    const handleCheckout = async (event)=>{
        const data = {
            user: user,
            cart: cart.products,
            total: cart.totalPrice
        }
        axios.post(`${process.env.API_BASE_URL}/api/payment/create-checkout-session` , {data}).then(res=>{
            if (res.data.url){
                window.location.href = res.data.url
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            {/*<Navbar />*/}
            {/*<Announcements />*/}
            <div className={"sm:p-[20px] p-[10px] lg:mb-[100px] mb-[150px]"}>
                <h1 className={"text-center text-2xl font-semibold"}>YOUR BAG</h1>
                {/*<p onClick={resett}>reset</p>*/}
                <div className={"flex items-center justify-between lg:mt-[20px] mt-[30px]"}>
                    <Link to={"/products"}>
                        <button className={"sm:p-[10px] p-[6px] text-[18px] border bg-transparent border-black "}>CONTINUE SHOPPING</button>
                    </Link>
                    <div className={"sm:flex hidden gap-x-4"}>
                        <p className={"cursor-pointer underline"}>Sopping Bag(2)</p>
                        <p className={"cursor-pointer underline"}>Your Wishlist(0)</p>
                    </div>
                    <button className={"sm:p-[10px] p-[6px] text-[18px] text-white bg-black"}>CHECKOUT NOW</button>
                </div>
                <div className={"flex md:flex-row flex-col  justify-between lg:mt-12 mt-14 items-start"}>
                    <div style={{flex: "3.5"}} className={"flex flex-col gap-y-2"}>
                        {cart.products.map(product=>{
                            return <ProductDetails product={product} />
                        })}
                    </div>
                    <div className={"flex sm:flex-[1.3] flex-[1] w-full flex-col gap-7 lg:p-8 p-2 border border-gray-200 justify-start rounded-xl sm:mt-0 mt-4"}>
                        <h1 className={"text-3xl lg:text-start text-center font-semibold"}>ORDER SUMMARY</h1>
                        <div className={"flex justify-between lg:flex-row flex-col"}>
                            <p>Subtotal</p>
                            <p className={"text-end font-semibold"}>$ {cart.totalPrice}</p>
                        </div>
                        <div className={"flex justify-between lg:flex-row flex-col"}>
                            <p>Estimated Shipping</p>
                            <p className={"text-end font-semibold"}>$ 5.90</p>
                        </div>
                        <div className={"flex justify-between lg:flex-row flex-col"}>
                            <p>Shipping Discount</p>
                            <p className={"text-end font-semibold"}>$ -5.90</p>
                        </div>
                        <div className={"flex justify-between lg:flex-row flex-col"}>
                            <p className={"text-xl font-semibold"}>Total</p>
                            <p className={"text-xl font-semibold"}>$ {cart.totalPrice}</p>
                        </div>
                            <button onClick={handleCheckout} className={"p-4 bg-black text-white"}>CHECKOUT NOW</button>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
