import axios from 'axios';
import { homeTypess} from '../constants/top_product';
export const setTopProduct = (data) => ({
    type: homeTypess.SET_TOP_PRODUCT,
    data
})
export const getTopProduct = () => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post(`/bill/top/`)
    }
    catch(err) {
        console.log(err)
        return
    }
    dispatch(setTopProduct(res.data.data))
}