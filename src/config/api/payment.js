import axios from ".";
import { Endpoints } from "../constants";

export const getPaymentStatus = (checkoutId, cardType) => {
  return axios.get(`${Endpoints.PAYMENT_STATUS}?checkoutId=${checkoutId}&cardType=${cardType}`);
};

export const requestCheckoutID = (body, cardType) => {
  return axios.post(`${Endpoints.REQUEST_CHECKOUT}`,
    body,
    {
      headers: {
        "Content-type": "application/json",
       // Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const requestPaymentTypes = () => {
  return axios.get(`${Endpoints.PAYMENT_TYPES}`);
};