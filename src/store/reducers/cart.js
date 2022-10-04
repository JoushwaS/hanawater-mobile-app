import {
  SET_CART_DATA,
  CLEAR_CART,
  ADD_TO_CART,
  SET_TOTAL,
  MERGE_CART_PRODUCTS,
} from "../types";
import { mergeCart, _mergeCartOrders } from "../../utils";

const initialState = {
  freeDelivery: {},
  items: [],
  totals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_DATA:
      return {
        items: [...state.items],
        ...action.payload,
      };

    case CLEAR_CART:
      return {
        totals: [],
        items: [],
        freeDelivery: {},
      };

    // case ADD_TO_CART:
    //   return {
    //     ...state,
    //     cart: [...cart, action.payload],
    //   };

    case SET_TOTAL:
      return {
        ...state,

        total: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        items: mergeCart(state.items, action.payload),
      };

    case MERGE_CART_PRODUCTS:
      return {
        ...state,

        items: _mergeCartOrders(state.items, action.payload),
      };

    default:
      return state;
  }
};
