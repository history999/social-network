import React from "react";
import { loginThunk } from "../redux/auth-reducer";
import { connect, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LoginReduxForm } from "./LoginForm";

const Login = (props) => {

    let isAuth = useSelector((state) => state.authReducer.isAuth)

    const onSubmit = (formData) => {
        props.loginThunk(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Navigate to="/profile" />
    }

    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default connect(null, { loginThunk })(Login);

