import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import promotions from "./promotions";
import products from "./products";
import cart from "./cart";
import mosque from "./mosque";
import subscriptions from "./subscriptions";

// combine all reducers
const rootReducer = combineReducers({
  auth,
  common,
  promotions,
  products,
  cart,
  mosque,
  subscriptions,
});

export default rootReducer;
