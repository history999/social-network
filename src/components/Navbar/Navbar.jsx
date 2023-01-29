import React from "react";
import navbar from "./Navbar.module.scss"
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <div className={navbar.navbar}>
            <ul>
                <li>
                    <NavLink to="/profile/">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs">Dialogs</NavLink>
                </li>
                <li>
                    <NavLink to="/chat">Chat</NavLink>
                </li>
                <li>
                    <NavLink to="/users">Users</NavLink>
                </li>
                <li>
                    <NavLink to="/prices">Prices</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navbar