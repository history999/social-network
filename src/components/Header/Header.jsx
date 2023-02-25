import React from "react";
import header from "./Header.module.scss"
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../redux/auth-reducer";
import { useDispatch } from 'react-redux';

const Header = (props) => {
    let dispatch = useDispatch();

    return (
        <div className={header.header}>
            {props.isAuth ?
                <>
                    <p>{props.email}</p>
                    <button className="standart-button" onClick={() => dispatch(logoutThunk())}>Logout</button>
                </> :
                <NavLink to="/Login">LOGIN</NavLink>}

        </div>
    )
}

export default Header