import axios from "./";
import { Endpoints } from "../constants";

export const getCartTotal = (body) => {
  return axios.post(Endpoints.GET_CART_TOTAL, body);
};

export const addCartBulk = (customerId, body, accessToken) => {
  return axios.post(
    Endpoints.ADD_CART_BULK + "?customerId=" + customerId,
    body,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const applyCoupon = (body) => {
  return axios.post(Endpoints.APPLY_COUPON, body);
};

export const reOrder = (data) => {
  let orderId = data.orderId;
  let status = data.status;
  return axios.get(Endpoints.REORDER + `/${orderId}/${status}`);
};
