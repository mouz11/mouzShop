import React from 'react';
import {Email, Facebook, Instagram, Map, Phone, Pinterest, Twitter} from "@mui/icons-material";
import {Link, NavLink} from "react-router-dom";
import creditCards from '../assets/creditCards.png'

const linksList = [
    {
        title: "Home",
        link: "/",
    },{
        title: "Man Fashion",
        link: "/",
    },{
        title: "Woman Fashion",
        link: "/",
    },{
        title: "Accessories",
        link: "/",
    },{
        title: "My Account",
        link: "/",
    },{
        title: "Order Tracking",
        link: "/",
    },{
        title: "Wishlist",
        link: "/",
    },{
        title: "Terms",
        link: "/",
    },
]
function Footer(props) {
    return (
        <div className={"flex md:flex-row flex-col gap-y-8 items-stretch"}>
            <div className={"flex-1 flex flex-col justify-start items-center gap-y-4 p-[20px]"}>
                <h1 className={"font-bold text-3xl"}>MOUZSHOP.</h1>
                <p className={"text-[16px]"}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                </p>
                <div className={"flex gap-x-2"}>
                    <div className={"w-[40px] h-[40px] rounded-[50%] text-white bg-blue-500 justify-center flex  items-center"}>
                        <Facebook />
                    </div>
                    <div className={"w-[40px] h-[40px] rounded-[50%] text-white bg-pink-600 justify-center flex items-center"}>
                        <Instagram />
                    </div>
                    <div className={"w-[40px] h-[40px] rounded-[50%] text-white bg-sky-400 justify-center flex items-center"}>
                        <Twitter />
                    </div>
                    <div className={"w-[40px] h-[40px] rounded-[50%] text-white bg-rose-600 justify-center flex  items-center"}>
                        <Pinterest />
                    </div>
                </div>
            </div>
            <div className={"flex-1 p-[20px] gap-y-4 flex flex-col items-center"}>
                <h1 className={"text-xl font-semibold"}>Useful Links</h1>
                <div className={"flex items-end lg:justify-start justify-center"}>
                    <ul className={"gap-y-3 lg:gap-x-6 gap-x-2 flex flex-wrap w-[80%] justify-center"}>
                        {linksList.map(l=> {
                                return <li className={"lg:text-start text-center text-[16px] lg:w-[40%] w-[100%]"} key={l.title}>{l.title}</li>
                            }
                        )}
                    </ul>
                </div>
            </div>
            <div className={"flex-1 p-[20px] flex flex-col gap-y-4 md:justify-start justify-center md:items-start items-center"}>
                <h1 className={"text-xl font-semibold lg:text-start text-center"}>Contact</h1>
                <p className={"flex items-center gap-x-2 text-[16px] font-semibold"}><Map className={"mr-2"} />622 Dixie Path, South Tobinchester 98336</p>
                <p className={"flex items-center gap-x-2 text-[16px] font-semibold"}><Phone className={"mr-2 text-xl"} />+1 234 56 78</p>
                <p className={"flex items-center gap-x-2 text-[16px] font-semibold"}><Email className={"mr-2 text-xl"} />contact@mouzshop.dev.com</p>
                <div className={"h-8 w-full flex lg:justify-start justify-center"}>
                    <img className={"w-[50%] h-full"} src={creditCards} alt={"credit cards policy"} />
                </div>
            </div>
        </div>
    );
}

export default Footer;
