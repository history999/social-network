import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Field, Formik } from 'formik';
import pricesStyle from "./Prices.module.scss"
import { getListCrypto } from "../../redux/prices-reducer";
import { HourGlass } from "react-awesome-spinners";
import { AppPrices } from "./AppPrices";



const Prices = (props) => {
    const dispatch = useDispatch();

    let listCrypto = useSelector(state => state.pricesPage.listCrypto)

    let [selectCoin, setSelectCoin] = useState('')

    useEffect(() => {
        dispatch(getListCrypto('BTC'))
    }, [])

    let initialData = [];

    const submit = (e) => {
        dispatch(getListCrypto(e.coin))
    }

    listCrypto.map(e => {
        let obj = new Object()
        obj.time = e.time
        obj.value = e.close
        initialData.push(obj)
    })


    return (<>

        {!listCrypto.length ? <HourGlass /> :
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{ coin: selectCoin }}
                    onSubmit={submit}
                >
                    {({
                        values,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit} className={pricesStyle.form}>
                            <Field
                                className="small-button"
                                as='select'
                                name="coin"
                                value={values.coin}
                            >
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="DOT">DOT</option>
                                <option value="SOL">SOL</option>
                                <option value="APT">APT</option>
                            </Field>
                            <button className="small-button" type='submit'>Search</button>
                        </form>
                    )}

                </Formik>
                <AppPrices {...props} data={initialData}></AppPrices>
            </div>

        }

    </>
    );
}

export default Prices