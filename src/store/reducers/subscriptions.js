import { GET_SUBSCRIPTIONS } from "../types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      return action.payload;

    default:
      return state;
  }
};
