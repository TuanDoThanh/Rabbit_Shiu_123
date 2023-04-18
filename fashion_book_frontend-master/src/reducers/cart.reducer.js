import { cartTypes } from "../constants/action.types";
import { combineReducers } from "redux";
const cart = (state = { data: [] }, action) => {
  switch (action.type) {
    case cartTypes.SET_CART: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({
  cart,
});
