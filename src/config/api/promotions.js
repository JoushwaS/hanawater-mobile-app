import axios from ".";
import { Endpoints } from "../constants";

export const getPromotionsList = () => {
  return axios.get(Endpoints.GET_PROMOTIONS);
};

export const addPromotionInCart = (id) => {
  return axios.get(Endpoints.ADD_PROMOTION_CART + id);
};

export const getTerms = () => {
  return axios.get(Endpoints.GET_TERMS);
};
