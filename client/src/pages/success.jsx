import React from 'react';
import {useDispatch} from "react-redux";
import {reset} from "../redux/features/cartSlice.js";
import {Link} from "react-router-dom";

function Success(props) {
    const dispatch = useDispatch()
    dispatch(reset())
    return (
        <div>
            success
            <Link to={'/'}>Home</Link>
        </div>
    );
}

export default Success;
