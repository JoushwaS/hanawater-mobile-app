import axios from "./";
import { Endpoints } from "../constants";

export const checkout = (body, accessToken) => {
  console.log("bodyy checouttt", body);
  return axios.post(Endpoints.PLACE_ORDER, body, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getOrders = (customerID) => {
  return axios.get(Endpoints.GETORDERS + `?customerId=${customerID}`);
};

export const getOrderDetail = (orderId) => {
  return axios.get(Endpoints.GETORDERDETAIL + `/${orderId}`);
};

export const getOrderRating = (orderId) => {
  return axios.get(Endpoints.GET_ORDER_RATING + `/${orderId}`);
};

export const rateOrder = (body) => {
  return axios.get(Endpoints.RATE_ORDER, body);
};

export const paymentByCard = (body) => {
  return axios.post(Endpoints.MISC_PAYMENT_URL, body);
};

export const cancelOrder = (orderId, statusId) => {
  return axios.get(Endpoints.ORDER_STATUS + "/" + orderId + "/" + statusId);
};
