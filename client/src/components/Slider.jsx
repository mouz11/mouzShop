import React, {useState} from 'react';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import img1 from '../assets/crop2.png'
import {sliderItems} from "../data.js";
import {Link} from "react-router-dom";

function Slider(props) {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction)=>{
        if (direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        }else {
            setSlideIndex(slideIndex <2 ? slideIndex+1 : 0)
        }
    }

    return (
        <div className={"h-[100%] flex relative overflow-hidden"}>
            <div onClick={()=>handleClick("left")} className={"w-[50px] h-[50px] bg-neutral-200 rounded-[50%] flex justify-center items-center absolute top-0 bottom-0 m-auto left-[10px] cursor-pointer opacity-50 z-20"}>
                <ArrowLeftOutlinedIcon />
            </div>
            <div className={"lg:h-screen sm:h-[80%] h-[300px] flex ease duration-1000"} style={{transform: `translateX(-${slideIndex*(100/3)}%)`}}>
                {sliderItems.map(item=>{
                    return (
                        <div key={item.img} className={`flex items-center w-screen`} style={{backgroundColor: item.bg}}>
                            <div className={"flex items-end justify-start flex-1 h-[100%] min-w-[180px]"}>
                                <img className={"lg:h-[100%] h-[95%]"} src={item.img} alt={"model"}/>
                            </div>
                            <div className={"flex-1 sm:p-[50px] p-[5px]"}>
                                <h1 className={"lg:text-[70px] sm:text-[50px] text-[30px] font-bold leading-none"}>{item.title}</h1>
                                <p className={"lg:my-[50px] sm:my-[30px] my-[15px] lg:text-[20px] sm:text-[18px] text-[14px] font-medium "}>{item.desc}</p>
                                <Link to={"/products"}>
                                    <button type={"button"} className={"sm:p-[10px] p-[8px] lg:text-[20px] sm:text-[18px] text-[16px] bg-transparent border-2 border-black"}>SHOP NOW</button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div onClick={()=>handleClick("right")} className={"w-[50px] h-[50px] bg-neutral-200 rounded-[50%] flex justify-center items-center absolute top-0 bottom-0 m-auto right-[10px] cursor-pointer opacity-50 z-20"}>
                <ArrowRightOutlinedIcon />
            </div>
        </div>
    );
}

export default Slider;
