import { cryptoApi } from "../api/api-crypto"


const SET_LIST_CRYPTO = 'SET_LIST_CRYPTO'


let initialState = {
    listCrypto: []
}

const pricesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_CRYPTO:
            return {
                ...state,
                ...action.payload
            }

        default: return state
    }
}

export const setListCrypto = (listCrypto) => ({ type: SET_LIST_CRYPTO, payload: { listCrypto } })




export const getListCrypto = (coin) => async (dispatch) => {
    let listCrypto = await cryptoApi.getListCrypto(coin);
    dispatch(setListCrypto(listCrypto.Data.Data))
}



export default pricesReducer;