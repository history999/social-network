import React from "react";
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import MobileNavStyle from './MobileNav.module.scss'

function getItem(
    label,
    key,
    children,
    type,
) {
    return {
        key,
        children,
        label,
        type,
    };
}

const items = [
    getItem('MENU', 'sub1', [
        getItem(<NavLink to="/profile/">Profile</NavLink>, 'g1'),
        getItem(<NavLink to="/dialogs">Dialogs</NavLink>, 'g2'),
        getItem(<NavLink to="/chat">Chat</NavLink>, 'g3'),
        getItem(<NavLink to="/users">Users</NavLink>, 'g4'),
        getItem(<NavLink to="/prices">Crypto</NavLink>, 'g5'),
    ]),
];


export const MobileNav = () => {

    return (<>
        <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    </>)
}