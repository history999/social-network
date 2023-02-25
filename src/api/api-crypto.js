import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data/v2/'
})

export const cryptoApi = {
    getListCrypto(coin){
        return instance.get('histoday?fsym=' + coin + '&tsym=USD&limit=50')
            .then(response => response.data)
    }
}