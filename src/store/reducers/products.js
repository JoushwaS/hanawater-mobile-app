import { SET_PRODUCTS } from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
};
