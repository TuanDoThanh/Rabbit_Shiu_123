import { paymentTypes } from "../constants/action.types";
import { combineReducers } from "redux";
const payment = (state = { data: [] }, action) => {
  switch (action.type) {
    
    case paymentTypes.PAYMENT_SUCCESS: {
      return {
        ...state,
        ispay: true,
      };
    }
    case paymentTypes.PAYMENT_FAIL: {
      return {
        ...state,
        ispay: false,
      };
    }
    case paymentTypes.RESET_PAYMENT: {
      return {
        ...state,
        ispay: null,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({
  payment,
});
