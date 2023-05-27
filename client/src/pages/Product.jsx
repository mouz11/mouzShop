import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Announcements from "../components/Announcements.jsx";
import NewsLetter from "../components/NewsLetter.jsx";
import Footer from "../components/Footer.jsx";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useGetSingleProductQuery} from "../redux/services/products.js";
import {useLocation} from "react-router-dom";
import {addProductToCart} from "../redux/features/cartSlice.js";
import {useDispatch} from "react-redux";

function Product(props) {
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [successIsVisible, setSuccessIsVisible] = useState(false)
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const { data, error, isLoading } = useGetSingleProductQuery(id)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [successIsVisible]);

    const handleClick = () => {
        dispatch(addProductToCart({...data?.product, color, size, quantity}))
        setSuccessIsVisible(true)
    }

    const handleQuantity = (op)=> {
        if (op === "-"){
            if (quantity !== 1){
                setQuantity(quantity - 1)
            }
        }else if(op === "+"){
            if (quantity !== 4){
                setQuantity(quantity + 1)
            }
        }
    }
    const handleSize = (e)=>{
        const size = e.target.value
        setSize(size)
        console.log(size)
    }
    const handleColor = (color)=>{
        setColor(color)
    }
    const dispatch = useDispatch()

    return (
        <div className={"relative"}>
            {/*<Navbar />*/}
            {/*<Announcements />*/}
            {successIsVisible && <div
                className="animate-hbat w-[20%] bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-2 shadow-md absolute top-4 right-[50%] translate-x-[50%]"
                role="alert">
                <div className="flex">
                    <div className="py-1">
                        <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold">Product has been Added to Cart</p>
                    </div>
                </div>
            </div>}

            <div className={"lg:p-[40px] p-[20px] flex sm:flex-row flex-col md:gap-x-4 gap-x-0"}>
                <div className={"flex justify-center items-center flex-1 xl:h-[650px] h-[500px] w-full"}>
                    <img className={"h-[100%] xl:w-full w-[80%] object-contain"} src={data?.product.image} alt={"product"} />
                </div>
                <div className={"flex-1 xl:py-8 py-6"}>
                    <div>
                        <h1 className={"font-light md:text-4xl text-3xl"}>{data?.product.title}</h1>
                        <p className={"lg:my-6 md:my-4 my-2 sm:max-w-[80%] max-w-[100%]"}>{data?.product.desc}</p>
                        <h1 className={"font-light md:text-4xl text-3xl"}>{data?.product.price} $</h1>
                    </div>
                    <div className={"flex lg:w-[50%] w-[100%] justify-between xl:my-14 my-6 my-4"}>
                        <div className={"flex items-center gap-x-4"}>
                            <p className={"md:text-[20px] text-[18px] font-normal"}>Color: </p>
                            {data?.product.color.map(item=>{
                                return <div onClick={()=>handleColor(item)} className={`w-[20px] cursor-pointer rounded-[50%] h-[20px] border ${item === color ? 'border-2' : ''} ${item === color ? 'border-black' : 'border-gray-400'}`} style={{backgroundColor: item}}></div>
                            })}

                        </div>
                        <div className={"flex items-center gap-x-4"}>
                            <p className={"md:text-[20px] text-[18px] font-normal"}>Size: </p>
                            <select onChange={handleSize} className={"outline-none w-[100px] md:text-[18px] text-[16px]"}>
                                <option selected disabled>Size</option>
                                {data?.product?.size?.map(size=>(
                                    <option>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={"flex w-[100%] justify-between"}>
                        <div className={"flex gap-x-2 items-center md:text-xl text-sm"}>
                            <RemoveIcon onClick={()=>handleQuantity("-")} className={"cursor-pointer text-gray-500 hover:text-black"}/>
                            <div className={"border border-gray-500 flex items-center justify-center text-center rounded-xl w-[40px] h-[40px]"}>
                                <span>{quantity}</span>
                            </div>
                            <AddIcon onClick={()=>handleQuantity("+")} className={"cursor-pointer text-gray-500 hover:text-black"} />
                        </div>
                        <button onClick={handleClick} className={"border-2 border-teal-400 md:p-4 p-2 hover:shadow-md"}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <NewsLetter />
            <Footer />
        </div>
    );
}

export default Product;
