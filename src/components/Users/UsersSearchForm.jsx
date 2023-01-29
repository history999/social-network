import React, { useEffect } from 'react'
import { Field, Formik } from 'formik';
import usersStyle from './Users.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './../../redux/users-reducer';

export default function UsersSearchForm(props) {
    const filter = useSelector(state => state.usersPage.filter)
    const dispatch = useDispatch()

    const submit = (filter) => {
        dispatch(getUsers(props.currentPage, props.pageSize, filter))
    }


    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: filter.friend }}
                onSubmit={submit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form className={usersStyle.form_search} onSubmit={handleSubmit}>
                        <input
                            className={'standart-input' + ' ' + usersStyle.usersforminput}
                            type="text"
                            name="term"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.term}
                        />
                        {errors.email && touched.email && errors.email}
                        <Field
                            as='select'
                            placeholder='Follow or unfollow'
                            name="friend"
                            className={usersStyle.selectFollow}
                            value={values.friend}
                        >
                            <option >All</option>
                            <option value={false}>Unfollowed</option>
                            <option value={true}>Followed</option>
                        </Field>
                        {errors.password && touched.password && errors.password}
                        <button className='standart-button' type="submit" >
                            Submit
                        </button>
                    </form>
                )}

            </Formik>
        </div>
    )
}
