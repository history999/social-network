import React, { useEffect } from "react";
import usersStyle from "./Users.module.scss"
import userIcon from "../../img/profile.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UsersSearchForm from './UsersSearchForm';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { followThunk, getUsers, unfollowThunk } from "../../redux/users-reducer";
import * as queryString from 'query-string'
import { startChattingThunk } from "../../redux/dialogs-reducer";
import { HourGlass } from "react-awesome-spinners";

let Users = (props) => {
    const dispatch = useDispatch();
    let currentPage = useSelector(state => state.usersPage.currentPage)
    const pageSize = useSelector(state => state.usersPage.pageSize)
    const users = useSelector(state => state.usersPage.users)
    const totalCount = useSelector(state => state.usersPage.totalCount)
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress)
    const filter = useSelector(state => state.usersPage.filter)


    let history = useNavigate()
    let location = useLocation()

    let pagesCount = Math.ceil(totalCount / pageSize)


    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [currentPage])

    useEffect(() => {
        let locationHistory = queryString.parse(location.search)
        let actualPage = currentPage
        let actualFilter = filter
        if (!!locationHistory.page) actualPage = +locationHistory.page

        if (!!locationHistory.term) actualFilter = { ...actualFilter, term: locationHistory.term }

        switch (locationHistory.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
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

    
    if(!users.length){
        return <HourGlass />
    }
    
    return <div>
        <UsersSearchForm currentPage={currentPage} pageSize={pageSize} />
        <Pagination className={usersStyle.pagination} defaultCurrent={currentPage} total={pagesCount} onChange={onPageChanged}/>
        
        {users.map(u => <div key={u.id} className={usersStyle.users}>
            <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small || userIcon} alt="img" />
            </NavLink>


            <div>
                <h3>{u.name}</h3>
                <p>{u.status}</p>
                <div className={usersStyle.blockButton}>
                    {
                        u.followed ? <button className='small-button' disabled={followingInProgress.some(id => id === u.id)} onClick={() => { dispatch(unfollowThunk(u.id)) }}>Unfollowed</button>
                            : <button className='small-button' disabled={followingInProgress.some(id => id === u.id)} onClick={() => { dispatch(followThunk(u.id)) }}>Followed</button>
                    }
                    <NavLink onClick={() => { dispatch(startChattingThunk(u.id)) }} className='small-button' key={u.id} to={'/dialogs/' + u.id + '/messages/'} >
                        Go to chat
                    </NavLink>
                </div>

            </div>
        </div>
        )}

    </div>
}

export default Users