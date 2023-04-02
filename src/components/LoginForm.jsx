import React from "react";
import { Field, reduxForm } from "redux-form";
import { email, required } from './validators/validators'
import { useSelector } from 'react-redux';
import loginStyle from './Login.module.scss'
import { FormControlInput } from "./FormsControls/FormsControl";

const LoginForm = props => {
    const captchaUrl = useSelector((state) => state.authReducer.captchaUrl)
    return (
        <form className={loginStyle.form} onSubmit={props.handleSubmit}>
            <div>
                <h1>LOGIN</h1>
                <Field validate={[required, email]} className={'standart-input' + ' ' + loginStyle.input} component={FormControlInput} name={'login'} placeholder={"Login"} />
                <Field validate={[required]} className={'standart-input' + ' ' + loginStyle.input} component={FormControlInput} type={'password'} name={'password'} placeholder={"Password"} />
                <p className={loginStyle.rememberMe}>Remember me: <Field component={'input'} type={'checkbox'} name={'rememberMe'} /></p>
                {captchaUrl && <div>
                    <img src={captchaUrl} alt="" />
                    <Field validate={[required]} className={'standart-input' + ' ' + loginStyle.input} component={FormControlInput} type={'input'} name={'captcha'} />
                </div>}
                <button className="standart-button">Submit</button>
            </div>
        </form>
    )
}



export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)