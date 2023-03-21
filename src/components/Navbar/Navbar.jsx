import React from "react";
import navbar from "./Navbar.module.scss"
import { NavLink } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
    const mobileScreen = useMediaQuery({ query: '(max-width: 768px)' })

    return (

        <div className={navbar.navbar}>
            {mobileScreen ?
                <MobileNav className={navbar.mobileNav} />
                :
                <ul className={navbar.desktopMenu}>
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
                        <NavLink to="/prices">Crypto</NavLink>
                    </li>
                </ul>
            }


        </div>
    )
}

export default Navbar