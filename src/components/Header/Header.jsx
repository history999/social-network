import React from "react";
import header from "./Header"
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../redux/auth-reducer";
import { useDispatch } from 'react-redux';

const Header = (props) => {
    let dispatch = useDispatch();

    return (
        <div className={header.header}>
            {props.isAuth === true ? 
            <div>{props.email} <button onClick={() => dispatch(logoutThunk())}>Logout</button></div> : 
            <NavLink to="/Login">LOGIN</NavLink>}
            
        </div>
    )
}

export default Header