import axios from ".";
import { Endpoints } from "../constants";

export const getProductsList = () => {
  return axios.get(Endpoints.GET_PRODUCTS);
};

export const getMosqueList = () => {
  return axios.get(Endpoints.GET_MOSQUE);
};

export const getSubscriptionList = () => {
  return axios.get(Endpoints.GET_SUBSCRIPTIONS);
};

export const getMosqueProducts = (languageId) => {
  return axios.get(
    Endpoints.CUSTOMER_PRODUCT + `?categoryId=13&languageId=${languageId}`
  );
};
