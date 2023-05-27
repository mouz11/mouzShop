import React, {useState} from 'react';
import fashionBackground from '../assets/fashionBackground.jpg'
import {signup} from "../redux/apiCalls.js";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Register(props) {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = async()=>{
        try {
            await signup(dispatch, {email, username, password})
            navigate('/')
        }catch (err){
            setError(err.message)
        }


    }
    return (
        <div className={"w-screen h-screen relative flex justify-center items-center"}>
            <div className={"absolute top-0 left-0 w-full h-full z-2"}>
                <img src={fashionBackground} className={"h-full w-full object-cover"} alt={"background"} />
            </div>
            <div className={"absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-gray-400 opacity-20 z-5"}>

            </div>
            <div className={"z-20 p-[20px] flex flex-col bg-white gap-y-8 rounded-xl"} style={{width:"500px"}}>
                <h1 className={"text-2xl font-semibold text-center"}>CREATE AN ACCOUNT</h1>
                <div className={"flex lg:flex-col flex-wrap gap-y-2 gap-x-2 w-full"}>
                    <input onChange={(e)=>{setFname(e.target.value)}} value={fname} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"name"}/>
                    <input onChange={(e)=>{setLname(e.target.value)}} value={lname} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"last name"}/>
                    <input onChange={(e)=>{setUsername(e.target.value)}} value={username} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"username"}/>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"email"}/>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"password"}/>
                    <input className={"p-4 text-[16px] outline-none border border-1 border-gray-200 active:border-teal-400 rounded-xl"} placeholder={"confirm password"}/>
                    <div className={"mt-4 ml-2 text-[18px]"}>By creating an account, I consent to the processing of my personal data in accordance with the <b className={"ml-2"}>PRIVACY POLICY</b></div>
                    <button onClick={handleClick} className={"mt-8 w-full text-xl border border-teal-400 text-white bg-teal-400 py-4 rounded-xl active:bg-white active:text-teal-400 active:border"}>CREATE</button>
                    {error &&
                        <p className={"text-red-600"}>{error}</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Register;
