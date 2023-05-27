import React from 'react';
import {Send} from "@mui/icons-material";

function NewsLetter(props) {
    return (
        <div className={"h-screen w-full h-[600px] p-[30px] flex flex-col justify-center items-center"} style={{backgroundColor: "#fcf5f5"}}>
            <h1 className={"text-[70px] m-[20px]"}>Newsletter</h1>
            <div className={"text-[24px] sm:text-start text-center font-normal lg:mb-[20px] mb-[40px]"}>Get timely updates from your favorite products.</div>
            <div className={"lg:w-[50%] w-[100%] bg-white h-14 flex justify-between items-center"}>
                <input className={"outline-none h-full p-2 flex-1 text-[20px] border border-gray-300 focus:border-teal-400"} placeholder={"Your email"}/>
                <button className={"bg-teal-400 h-full w-[100px] text-white"}>
                    <Send />
                </button>
            </div>
        </div>
    );
}

export default NewsLetter;
