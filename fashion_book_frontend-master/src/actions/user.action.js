import { userTypes } from "../constants/action.types";
import storeConfig from "../config/storage.config";
import axios from "axios";
import { API_URL } from "../constants/urls";

export const loginSuccess = (token, user) => async (dispatch, getState) => {
  storeConfig.setUser(user);
  storeConfig.setToken(token);
  dispatch(setLoginSuccess());

  let cart = storeConfig.getCart();
  storeConfig.removeCart();
  if (cart !== null) {
    let res;
    try {
      res = await axios.post(`${API_URL}/cart/addtocard`, {
        id_user: user.id,
        products: cart,
      });
    } catch (err) {
      console.log(JSON.stringify(err.response));
      return;
    }
  }
};
export const auth = () => async (dispatch, getState) => {
  if (storeConfig.getUser() === null) {
    dispatch(setLoginFail());
    return false;
  }
  let email = storeConfig.getUser().email;
  let token = storeConfig.getToken();
  let res;
  try {
    res = await axios.post(`${API_URL}/auth`, {
      email: email,
      token: token,
    });
  } catch (err) {
    // dispatch(setLoginFail());
    return false;
  }
  dispatch(setLoginSuccess());
  return true;
};
export const resetIsLogin = () => ({
  type: userTypes.RESET_IS_LOGIN,
});
export const logout = () => (dispatch, getState) => {
  storeConfig.clear();
  dispatch(setLoginFail());
};
export const setEmail = (email) => ({
  type: userTypes.SET_EMAIL_LOGIN,
  email,
});
export const setLoginSuccess = () => ({
  type: userTypes.LOGIN_SUCCESS,
  data: "login success",
});
export const setLoginFail = () => ({
  type: userTypes.LOGIN_FAIL,
  data: "login fail",
});

export const forgotEmailSuccess = () => ({
  type: userTypes.FORGOT_EMAIL_SUCCESS,
});
export const forgotEmailFail = () => ({
  type: userTypes.FORGOT_EMAIL_FAIL,
});
export const resetForgotPassword = () => ({
  type: userTypes.RESET_FORGOT_PASSWORD,
});
export const setEmailForgotPassword = (email) => ({
  type: userTypes.SET_EMAIL_FORGOTPASSWORD,
  email,
});
export const submitForgotPassword = (email) => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.get(`${API_URL}/user/request/forgotpassword/${email}`);
  } catch (err) {
    // dispatch(forgotEmailFail());
    return;
  }
  dispatch(setEmailForgotPassword(res.data.email));
  dispatch(forgotEmailSuccess());
};
export const submitOTP = (otp) => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.post(`${API_URL}/user/verify/forgotpassword`, {
      email: getState().userReducers.forgotPassword.email,
      otp: otp,
    });
  } catch (err) {
    // dispatch(verifyOTPFAIL());
    return;
  }
  dispatch(verifyOTPSuccess(otp));
};
export const verifyOTPSuccess = (otp) => ({
  type: userTypes.VERIFY_OTP_SUCCESS,
  otp,
});
export const verifyOTPFAIL = () => ({
  type: userTypes.VERIFY_OTP_FAIL,
});

export const submitEnterNewPassword =
  (newPassword) => async (dispatch, getState) => {
    let res;
    try {
      res = await axios.post(`${API_URL}/user/forgotpassword`, {
        email: getState().userReducers.forgotPassword.email,
        otp: getState().userReducers.forgotPassword.otp,
        newPassword: newPassword,
      });
    } catch (err) {
      dispatch(forgotPasswordFail());
      return;
    }
    dispatch(forgotPasswordSuccess());
  };

export const forgotPasswordSuccess = () => ({
  type: userTypes.FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFail = () => ({
  type: userTypes.FORGOT_PASSWORD_FAIL,
});


// const form = document.querySelector("#otp-form");
// const inputs = document.querySelectorAll(".otp-input");
// const verifyBtn = document.querySelector("#verify-btn");

// const isAllInputFilled = () => {
//     return Array.from(inputs).every((item) => item.value);
//   };

// const getOtpText = () => {
//     let text = "";
//     inputs.forEach((input) => {
//       text += input.value;
//     });
//     return text;
//   };

// const verifyOTP = () => {
//     if (isAllInputFilled()) {
//       const text = getOtpText();
//       alert(`Your OTP is "${text}". OTP is correct`);
//     }
//   };

// const toggleFilledClass = (field) => {
//     if (field.value) {
//       field.classList.add("filled");
//     } else {
//       field.classList.remove("filled");
//     }
//   };

//   form.addEventListener("input", (e) => {
//     const target = e.target;
//     const value = target.value;
//     console.log({ target, value });
//     toggleFilledClass(target);
//     if (target.nextElementSibling) {
//       target.nextElementSibling.focus();
//     }
//     verifyOTP();
//   });

//   inputs.forEach((input, currentIndex) => {
//     // fill check
//     toggleFilledClass(input);

//     // paste event
//     input.addEventListener("paste", (e) => {
//       e.preventDefault();
//       const text = e.clipboardData.getData("text");
//       console.log(text);
//       inputs.forEach((item, index) => {
//         if (index >= currentIndex && text[index - currentIndex]) {
//           item.focus();
//           item.value = text[index - currentIndex] || "";
//           toggleFilledClass(item);
//           verifyOTP();
//         }
//       });
//     });

//     // backspace event
//     input.addEventListener("keydown", (e) => {
//       if (e.keyCode === 8) {
//         e.preventDefault();
//         input.value = "";
//         // console.log(input.value);
//         toggleFilledClass(input);
//         if (input.previousElementSibling) {
//           input.previousElementSibling.focus();
//         }
//       } else {
//         if (input.value && input.nextElementSibling) {
//           input.nextElementSibling.focus();
//         }
//       }
//     });
//   });

//   verifyBtn.addEventListener("click", () => {
//     verifyOTP();
//   });
