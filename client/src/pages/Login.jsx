import React, {useState} from 'react';
import fashionBackground from "../assets/backgroundLogin.jpg";
import {Link} from "react-router-dom";
import {login} from "../redux/apiCalls.js";
import {useDispatch, useSelector} from "react-redux";

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector(state => state.user)
    const handleClick = (e)=>{
        e.preventDefault()
        login(dispatch, {email, password})
    }
    return (
        <div className={"w-screen h-screen relative flex justify-center items-center"}>
            <div className={"absolute top-0 left-0 w-full h-full z-2"}>
                <img src={fashionBackground} className={"h-full w-full object-cover"} alt={"background"} />
            </div>
            <div className={"absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-gray-400 opacity-20 z-5"}>

            </div>
            <div className={"z-20 p-[20px] flex flex-col bg-white gap-y-8 rounded-xl"} style={{width:"500px"}}>
                <h1 className={"text-2xl font-semibold text-center"}>SIGN IN</h1>
                <div className={"flex flex-col gap-y-2 w-full"}>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"email"}/>
                    <input type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"password"}/>
                    <button disabled={isFetching} onClick={handleClick} className={`mt-4 text-xl border border-teal-400 text-white ${!isFetching ? 'bg-teal-400' : 'bg-teal-100'} py-4 rounded-xl active:bg-white active:text-teal-400 active:border ${isFetching && "cursor-not-allowed"}`}>LOGIN</button>
                    {error && <div className={"text-red-600"}>Something went wrong</div>}
                    <div className={"mt-2 ml-2"}>
                        <Link className={"text-sky-600 hover:border-b hover:border-sky-600 "}>DON'T YOU REMEMBER THE PASSWORD ?</Link>
                        <Link to={"/register"} className={"text-sky-600 hover:border-b hover:border-sky-600 ml-2"}>CREATE A NEW ACCOUNT</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
