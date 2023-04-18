import { cartTypes } from "../constants/action.types";
import axios from "axios";
import { API_URL } from "../constants/urls";
import storeConfig from "../config/storage.config";
export const setCart = (data) => ({
  type: cartTypes.SET_CART,
  data,
});
export const getCart = () => async (dispatch, getState) => {
  let cart = null;
  cart = storeConfig.getCart();
  if (cart !== null) {
    dispatch(setCart(cart));
    return;
  }
  if (storeConfig.getUser() === null) return;
  let id_user = storeConfig.getUser().id;
  try {
    cart = await axios.get(`${API_URL}/cart/${id_user}`);
  } catch (err) {
    console.log(err);
    return;
  }
  if (cart.data.data !== null) {
    dispatch(setCart(cart.data.data.products));
  }
};
export const updateProductInCart = (product) => async (dispatch, getState) => {
  if (!getState().userReducers.login.islogin) {
    storeConfig.updateProductInCart(product);
  } else {
    try {
      await axios.post(`${API_URL}/cart/update`, {
        id_user: storeConfig.getUser().id,
        product: product,
      });
    } catch (err) {
      console.log(err.response);
    }
  }
  dispatch(getCart());
};
export const deteleProductInCart =
  (id_product) => async (dispatch, getState) => {
    if (!getState().userReducers.login.islogin) {
      storeConfig.deteleProductInCart(id_product);
    } else {
      try {
        await axios.post(`${API_URL}/cart/delete`, {
          id_user: storeConfig.getUser().id,
          id_product: id_product,
        });
      } catch (err) {
        console.log(err.response);
      }
    }
    dispatch(getCart());
  };
