import React from "react";
import usersStyle from "./Users.module.scss"
import profileImg from "../../img/profile.png"
import { NavLink } from "react-router-dom";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []

    if (pagesCount > 10) {
        if(props.currentPage > 5){
            for(let i = props.currentPage - 4; i <= props.currentPage+5;i++){
                pages.push(i)
                if(i === pagesCount) break
            }
        } else {
            for(let i = 1; i <= 10; i++){
                pages.push(i)
                if(i === pagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
    return <div>

        {pages.map(p => {
            return <span key={p} className={props.currentPage === p && usersStyle.selected}
                onClick={(e) => { props.onPageChanged(p) }}
            > {p} </span>
        })}


        {props.users.map(u => <div key={u.id} className={usersStyle.users}>
            <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small} alt="img" /></NavLink>

            <div>
                <h3>{u.name}</h3>
                <p>{u.status}</p>
                {
                    u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.unfollow(u.id) }}>NOTFollowed</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.follow(u.id) }}>Followed</button>
                }
                {/* <button onClick={() => {props.follow(u.id)}}>{ u.followed ? 'Followed' : 'NOTFollowed' }</button> */}
            </div>
        </div>
        )}

    </div>
}

export default Users