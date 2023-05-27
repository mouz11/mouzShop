import {Search} from "@mui/icons-material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from "react-router-dom";
import {pink} from "@mui/material/colors";
import {logout} from "../redux/apiCalls.js";

function Navbar() {
    const navigate = useNavigate();
    const [searchMobileActive, setSearchMobileActive] = useState(false)
    const [isProfileMenu, setIsProfileMenu] = useState(false)
    const cartItemsNumber = useSelector((state) => state.cart.numberOfProducts)
    const wishlistItemsNumber = useSelector((state) => state.wishlist.numberOfProducts)
    const user = useSelector(state => state.user.currentUser);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    const handleSearch = ()=>{
        navigate("/products?query=" + query);
    }
    const handleLogout = ()=>{
        logout(dispatch)
    }

    return (
        <nav className={"w-full lg:fixed relative top-0 bg-white z-50"}>
            <div className={"lg:px-8 px-4 py-6 flex items-center justify-between w-full"}>
                <div className={"flex-1 lg:flex hidden flex-row items-center"}>
                    <div className={"text-[14px] cursor-pointer"}>
                        EN
                    </div>
                    <div className={"border border-gray-300 flex items-center ml-[25px] p-[5px] text-gray-500 text-[16px]"}>
                        <input onChange={(e)=>setQuery(e.target.value)} value={query} className={"border-none outline-none"}/>
                        <Search onClick={handleSearch} className={"cursor-pointer"} />
                    </div>
                </div>
                <div className={"flex-1 lg:text-center text-start"}>
                    <Link to={"/"}>
                        <h1 className={"font-bold text-3xl"}>MOUZSHOP.</h1>
                    </Link>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <div className={"text-[14px] font-semibold cursor-pointer pr-4 lg:hidden block"}>
                        <Search onClick={()=>setSearchMobileActive(!searchMobileActive)} />
                    </div>
                    <div className={"relative text-[14px] font-semibold cursor-pointer pr-4 sm:hidden block"}>
                        <PersonIcon onClick={()=>setIsProfileMenu(!isProfileMenu)}/>
                        <div className={`absolute top-12 bg-white w-[160px] h-[100px] rounded-xl px-2 flex ${isProfileMenu ? 'flex': 'hidden'} ${isProfileMenu ? 'right-0': '-right-[1000%]'} ease duration-500 flex-col gap-y-8 justify-center items-start shadow-md`} style={{zIndex: "80", backgroundColor: "#f5fafd"}}>
                            <p className={"text-[14px] font-semibold cursor-pointer"}>SIGN IN</p>
                            <p className={"text-[14px] font-semibold cursor-pointer"}>REGISTER</p>
                        </div>
                    </div>
                    {!user && <div className={"flex sm:flex hidden"}>
                        <p className={"text-[14px] font-semibold cursor-pointer pr-4"}>REGISTER</p>
                        <p className={"text-[14px] pr-4"}>|</p>
                        <p className={"text-[14px] font-semibold cursor-pointer pr-4"}>SIGN IN</p>
                    </div>}
                    {user && <Link className={"mr-4"} to={'/wishlist'}>
                        <Badge badgeContent={wishlistItemsNumber} color="primary">
                            <FavoriteIcon sx={{color: pink[500]}}/>
                        </Badge>
                    </Link>
                    }

                    {user &&
                        <Link to={'/cart'} >
                        <Badge badgeContent={cartItemsNumber} color="primary">
                        <ShoppingCartOutlinedIcon />
                        </Badge>
                        </Link>}
                    {user &&
                        <p onClick={handleLogout} className={"text-[14px] font-semibold cursor-pointer pl-6 text-sky-800"}>Logout</p>
                    }

                </div>
            </div>
            {searchMobileActive &&
                <div className={"border bg-white w-full top-[100%] border-gray-300 flex items-center text-gray-500 text-[16px] h-[50px]"}>
                    <input className={"border-none outline-none w-full px-8"} placeholder={"Search a product..."}/>
                    <Search className={"mr-4"} />
                </div>
            }
        </nav>
    );
}

export default Navbar;
