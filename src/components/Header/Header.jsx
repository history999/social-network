import React from "react";
import header from "./Header"
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <div className={header.header}>
            {props.isAuth === true ? props.email : <NavLink to='/login'></NavLink>}
            
        </div>
    )
}

export default Header