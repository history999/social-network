import React from "react";
import { connect } from "react-redux";
import {Navigate} from "react-router-dom"

let mapStateToPropsRedirect = (state) => ({
    isAuth: state.authReducer.isAuth
})

const hocAuth = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to='/Login'/>

            return <Component {...this.props}/>
        }
    }
    let connectRedirect = connect(mapStateToPropsRedirect)(RedirectComponent)

    return connectRedirect
}

export default hocAuth