import { getCartTotal } from "../../config/api/cart";
import { showToast } from "../../utils";
import {
  ADD_TO_CART,
  SET_CART_DATA,
  CLEAR_CART,
  SET_TOTAL,
  SUBSCRIBE_PRODUCT,
  MERGE_CART_PRODUCTS,
  REMOVE_FROM_CART,
} from "../types";
import { toggleLoader } from "./common";

const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

const subscribe = (payload) => {
  return {
    type: SUBSCRIBE_PRODUCT,
    payload,
  };
};

const cartTotal = (payload) => {
  return {
    type: SET_TOTAL,
    payload,
  };
};

const _mergeCart = (cartProducts) => {
  return {
    type: MERGE_CART_PRODUCTS,
    payload: cartProducts,
  };
};

// const getTotal = (payload) => async (dispatch) => {
//   try {
//     dispatch(toggleLoader());
//     const { data: cartTotal } = await getCartTotal({
//       items: payload,
//     });
//     payload.callback(cartTotal.data);
//     dispatch(toggleLoader());
//     if (cartTotal.error) {
//       showToast({
//         text: cartTotal.message || error.message,
//         type: "error",
//       });
//     }
//   } catch (error) {
//     dispatch(toggleLoader());
//     showToast({
//       text: error.response.data.message || error.message,
//       type: "error",
//     });
//   }
// };

const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

const setTotal = (payload) => {
  return {
    type: SET_CART_DATA,
    payload,
  };
};

export {
  addToCart,
  setTotal,
  clearCart,
  cartTotal,
  _mergeCart,
  subscribe,
  removeFromCart,
};
