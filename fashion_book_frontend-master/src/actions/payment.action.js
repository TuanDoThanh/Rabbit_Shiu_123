import { paymentTypes } from "../constants/action.types";
import axios from "axios";
import { API_URL } from "../constants/urls";
import storeConfig from "../config/storage.config";


export const paymentSuccess = () => ({
  type: paymentTypes.PAYMENT_SUCCESS,
});
export const paymentFail = () => ({
  type: paymentTypes.PAYMENT_FAIL,
});
export const resetPayment = () => ({
  type: paymentTypes.RESET_PAYMENT,
});
export const payment =
  (address, phone, name, total) => async (dispatch, getState) => {
    let res = null;
    try {
      console.log(total);
      console.log(address);
      console.log(phone);
      console.log(name);
      res = await axios.post(`${API_URL}/bill/add`, {
        id_user: storeConfig.getUser().id,
        address: address,
        phone: phone,
        name: name,
        total: total,
        email: storeConfig.getUser().email,
      });
    } catch (err) {
      dispatch(paymentFail());
      console.log(err.response);
      dispatch(resetPayment());
      return;
    }
    dispatch(paymentSuccess());
    dispatch(resetPayment());
  };
