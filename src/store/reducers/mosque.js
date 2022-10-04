import { GET_MOSQUE } from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_MOSQUE:
      return action.payload;

    default:
      return state;
  }
};
