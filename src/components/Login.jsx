import React from "react";
import { Field, reduxForm } from "redux-form";
import {required}  from './validators/validators'
import { loginThunk } from "../redux/auth-reducer";
import { connect, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
    
    let isAuth = useSelector((state) => state.authReducer.isAuth)

    const onSubmit = (formData) => {
        props.loginThunk(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if(isAuth){
       return <Navigate to="/profile"  />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default connect(null, {loginThunk})(Login);

const LoginForm = props => {
    const captchaUrl = useSelector((state) => state.authReducer.captchaUrl)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required]} component={'input'} name={'login'} placeholder={"Login"} />
            </div>
            <div>
                <Field validate={[required]} component={'input'} name={'password'} placeholder={"Password"} />
            </div>
            <div>
                Remember me: <Field validate={[required]} component={'input'} type={'checkbox'} name={'rememberMe'} />
            </div>
            {captchaUrl && <div>
                <img src={captchaUrl} alt="" />
                <Field validate={[required]} component={'input'} type={'input'} name={'captcha'} />
            </div>}
            <button >Submit</button>
        </form>
    )
}



const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)