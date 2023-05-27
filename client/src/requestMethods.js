import axios from 'axios'
import {useSelector} from "react-redux";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).token
const BASE_URL = "http://localhost:500/api/"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})
