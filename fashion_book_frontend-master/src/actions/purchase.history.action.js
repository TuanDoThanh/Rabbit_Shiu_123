import axios from 'axios'
import { API_URL } from "../constants/urls";
import storeConfig from '../config/storage.config'
import { purchaseHistoryTypes } from '../constants/action.types'
export const setPurchaseHistory = (data) => ({
    type: purchaseHistoryTypes.SET_PURCHASED_HISTORY,
    data
})
export const getPurchaseHitory = () => async (dispatch, getState) => {
    let res = null
    let user = storeConfig.getUser()
    if(user === null) 
        return
    try {
        res = await axios.get(`${API_URL}/bill/${user.id}`)
    }
    catch(err) {
        console.log(err)
        return
    }
    dispatch(setPurchaseHistory(res.data.data))
}
export const deleteBill = (id) => async (dispatch, getState) => {
    try {
        await axios.get(`${API_URL}/bill/delete/${id}`)
    }
    catch(err) {
        console.log(err.response)
    }
    dispatch(getPurchaseHitory())
}
