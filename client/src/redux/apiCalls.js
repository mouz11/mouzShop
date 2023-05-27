import {loginSuccess, loginFailure, loginStart, logoutSuccess, logoutFailure, logoutStart, signupStart, signupSuccess, signupFailure} from "./features/userSlice.js";
import axios from "axios";
import '../../dotenv';
export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try {
        const response = await axios.post(`${process.env.API_BASE_URL}/api/auth/login`,{
            ...user
        })
        dispatch(loginSuccess(response.data))
    }catch (err){
        dispatch(loginFailure())
    }
}
export const signup = async (dispatch, user)=>{
    dispatch(signupStart())
    try {
        const response = await axios.post(`${process.env.API_BASE_URL}/api/auth/register`,{
            ...user
        })
        dispatch(signupSuccess())
    }catch (err){
        dispatch(signupFailure())
        throw err;
    }
}
export const logout = async (dispatch)=>{
    dispatch(logoutStart())
    try {
        const response = await axios.post(`${process.env.API_BASE_URL}/api/auth/logout`,)
        dispatch(logoutSuccess())
    }catch (err){
        dispatch(logoutFailure())
    }
}
