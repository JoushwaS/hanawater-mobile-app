import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  SIGNUP_SUCCESS,
  SET_USER_DATA,
  REFRESH_USER_TOKEN,
  UPDATE_USER_DATA,
} from "../types";
import { loginUser, verifyCode } from "../../config/api/auth";
import Navigation from "../../navigation/root";
import { showToast } from "../../utils";
import { toggleLoader } from "./common";
import { SCREENS } from "../../config/constants/screens";

const userSignUp = (payload, props, phone) => async (dispatch) => {
  // console.log("propssss", props);
  try {
    dispatch(toggleLoader(true));
    const { data: customerData } = await loginUser(payload);
    const { codes, customer } = customerData.data;
    dispatch(toggleLoader(false));
    dispatch(setUserData({ codes, customer, isAuthenticated: false }));
    // return;
    Navigation.navigate(SCREENS.VERIFICATION_CODE, {
      cart: props.route.params?.cart,
      fromProfile: props.route.params?.fromProfile,
      phone,
    });
  } catch (error) {
    console.log("error", error.response.data);
    dispatch(toggleLoader(false));
    showToast({
      text: error?.response?.data?.message || error.message,
      type: "error",
    });
  }
};

const verifyOTP = (payload, accessToken, props) => async (dispatch) => {
  // console.log("propsss verify ", props);
  try {
    // console.log("payload", payload, accessToken);
    dispatch(toggleLoader(true));
    const { data: OTPdata } = await verifyCode(payload, accessToken);
    console.log("OTPdata", OTPdata);
    dispatch(toggleLoader(false));
    if (OTPdata.success) {
      showToast({
        text: "OTP verified",
        type: "success",
      });
      dispatch(setAuth());
      if (props.route.params.cart == false || props.route.params.fromProfile) {
        Navigation.navigate(SCREENS.HOME_SCREEN);
      } else {
        Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
          fromOTP: true,
        });
      }
    } else {
      showToast({
        text: OTPdata?.error || "Something went wrong",
        type: "error",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    dispatch(toggleLoader(false));
    showToast({
      text: error?.response?.data?.message || error.message,
      type: "error",
    });
  }
};

const userLogin = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

const userLogout = (payload) => {
  return {
    type: LOGOUT,
    payload,
  };
};

const setUserData = (payload) => {
  return {
    type: SET_USER_DATA,
    payload,
  };
};

const updateUserData = (payload) => {
  return {
    type: UPDATE_USER_DATA,
    payload,
  };
};

const refreshUserTokens = (tokens) => {
  return {
    type: REFRESH_USER_TOKEN,
    payload: tokens,
  };
};

const setAuth = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export {
  userSignUp,
  userLogin,
  userLogout,
  setUserData,
  verifyOTP,
  setAuth,
  refreshUserTokens,
  updateUserData,
};
