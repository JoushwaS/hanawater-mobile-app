import axios from "./";
import Config from "./config";
import { Endpoints } from "../constants";

export const loginUser = (body) => {
  return axios.post(Endpoints.LOGIN_USER, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: Config.CLIENT_SECRET,
    },
  });
};

export const verifyCode = (body) => {
  return axios.post(Endpoints.VERIFY_OTP, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: Config.CLIENT_SECRET,
    },
  });
};

export const getAddressList = () => {
  return axios.get(Endpoints.ADD_ADDRESS);
};

export const deleteAddress = (id) => {
  return axios.delete(`${Endpoints.ADD_ADDRESS}/${id}`);
};

export const addAddress = (body) => {
  console.log("body", body);
  return axios.post(Endpoints.ADD_ADDRESS, body, {
    headers: {
      "Content-type": "application/json",
      // Authorization: "Bearer " + accessToken,
    },
  });
};

export const getCities = () => {
  return axios.get(Endpoints.MISC_CITIES);
};

export const getProfile = () => {
  return axios.get(Endpoints.CUSTOMER_PROFILE);
};

export const updateProfile = (customerId, user, token) => {
  return axios.put(`${Endpoints.CUSTOMER}/${customerId}`, user, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProfile = (customerId, token) => {
  return axios.delete(`${Endpoints.DELETE_CUSTOMER}/${customerId}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
