import { SET_PRODUCTS, GET_MOSQUE, GET_SUBSCRIPTIONS } from "../types";

const setProductsData = (payload) => {
  return {
    type: SET_PRODUCTS,
    payload,
  };
};

const setMosqueData = (payload) => {
  return {
    type: GET_MOSQUE,
    payload,
  };
};

const setSubscriptionData = (payload) => {
  return {
    type: GET_SUBSCRIPTIONS,
    payload,
  };
};

export { setProductsData, setMosqueData, setSubscriptionData };
