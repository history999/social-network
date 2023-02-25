import React from "react";
import { connect } from "react-redux";
import Header from '../Header/Header'
import {setUserDataThunk} from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount() {
       this.props.setUserDataThunk()
    }

    render() {
        return (
            <Header {...this.props}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        id: state.authReducer.id,
        email: state.authReducer.email,
        login: state.authReducer.login,
        isAuth: state.authReducer.isAuth
    }
   
}

export default connect(mapStateToProps, 
    {setUserDataThunk})(HeaderContainer)
    