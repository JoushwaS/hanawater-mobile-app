import { SET_PROMOTIONS } from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_PROMOTIONS:
      return action.payload;

    default:
      return state;
  }
};
