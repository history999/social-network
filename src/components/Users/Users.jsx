import React, { useEffect } from "react";
import usersStyle from "./Users.module.scss"
import userIcon from "../../img/profile.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UsersSearchForm from './UsersSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { followThunk, getUsers, unfollowThunk } from "../../redux/users-reducer";
import * as queryString from 'query-string'

let Users = (props) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.usersPage.currentPage)
    const pageSize = useSelector(state => state.usersPage.pageSize)
    const users = useSelector(state => state.usersPage.users)
    const totalCount = useSelector(state => state.usersPage.totalCount)
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress)
    const filter = useSelector(state => state.usersPage.filter)


    let history = useNavigate()
    let location = useLocation()


    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [currentPage])

    useEffect(() => {
        let locationHistory = queryString.parse(location.search)
        let actualPage = currentPage
        let actualFilter = filter
        if(!!locationHistory.page) actualPage = +locationHistory.page
        
        if(!!locationHistory.term) actualFilter = {...actualFilter, term: locationHistory.term}

        switch(locationHistory.friend){
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    
    useEffect(() => {
        history(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    }, [filter, currentPage])



    


    const onPageChanged = (page) => {
        dispatch(getUsers(page, pageSize, filter))
    }

    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []

    //PAGINATOR
    if (pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
        } else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
    return <div>
        <UsersSearchForm currentPage={currentPage} pageSize={pageSize} />


        {pages.map(p => {
            return <span key={p} className={currentPage === p && usersStyle.selected}
                onClick={(e) => { onPageChanged(p) }}
            > {p} </span>
        })}


        {users.map(u => <div key={u.id} className={usersStyle.users}>
            <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small || userIcon} alt="img" />
            </NavLink>

            <div>
                <h3>{u.name}</h3>
                <p>{u.status}</p>
                {
                    u.followed ? <button className="standart-button" disabled={followingInProgress.some(id => id === u.id)} onClick={() => { dispatch(unfollowThunk(u.id)) }}>Unfollowed</button>
                        : <button className="standart-button" disabled={followingInProgress.some(id => id === u.id)} onClick={() => { dispatch(followThunk(u.id)) }}>Followed</button>
                }
            </div>
        </div>
        )}

    </div>
}

export default Users