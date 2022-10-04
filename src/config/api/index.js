import axios from "axios";
import Config from "./config";
import { store } from "../../store";
import { Endpoints } from "../constants";
import { GUEST_PHONE_NUMBER } from "../../store/types";
import { setUserData, verifyOTP, refreshUserTokens } from "../../store/actions";
import { loginUser } from "./auth";
import { showToast } from "../../utils";
import qs from "qs";

const instance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: {
    // "Content-Type": "application/json",
    Authorization: Config.CLIENT_SECRET,
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("REQUEST :", config);

    // console.log(
    //   "REQUEST instance.interceptors.request:",
    //   store.getState().auth
    // );

    if (store.getState().auth.codes.accessToken) {
      let accessToken = store.getState().auth.codes.accessToken;
      if (accessToken) {
        // axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.log("REQUEST FAILURE:", error);
    return Promise.reject(error);
  }
);

const retryWithGuest = async () => {
  let userObj = {
    phone: "000",
  };
  let formBody = [];
  for (let property in userObj) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(userObj[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const { data: customerData } = await loginUser(formBody);
  console.log("customerDatacustomerDatacustomerData", customerData);
  const { codes, customer } = customerData.data;
  // if (store.getState().network.internetConnected) {
  // // return store.dispatch(login(userObj));
  return store.dispatch(
    setUserData({ codes, customer, isAuthenticated: false })
  );

  // }

  throw new Error("Unable to connect");
};

instance.interceptors.response.use(
  (response) => {
    console.log("RESPONSE :", response.data);
    if (!response) {
      showToast({
        type: "error",
        text: "Server not responding",
      });
    }
    return response;
  },
  (error) => {
    console.log("RESPONSE FAILURE:", error);
    const originalRequest = error.config;

    if (!error && !error.response) {
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      console.log(
        "error.response.statuserror.response.status",
        error.response.status
      );
      let refresh_token = null;
      originalRequest._retry = true;

      if (
        store.getState().auth.customer &&
        store.getState().auth.codes.refreshToken
      ) {
        refresh_token = store.getState().auth.codes.refreshToken;
      }

      if (refresh_token) {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const body = { refresh_token };

        return axios
          .post(Endpoints.REFRESH_TOKEN, qs.stringify(body), { headers })
          .then((res) => {
            console.log("src/utils/AxiosInstance.js:75", res);
            if (data.payload?.codes?.accessToken) {
              console.log("src/utils/AxiosInstance.js:77", res);
              // 1) put token to LocalStorage

              store.dispatch(
                refreshUserTokens(data.payload?.codes?.accessToken)
              );

              // 2) Change Authorization header

              axios.defaults.headers[
                "Authorization"
              ] = `Bearer ${data.payload?.codes?.accessToken}`;
              // 3) return originalRequest object with Axios.
              return instance(originalRequest);
            } else {
              return retryWithGuest().then((data) => {
                axios.defaults.headers[
                  "Authorization"
                ] = `Bearer ${data.payload?.codes?.accessToken}`;
                return instance(originalRequest);
              });
            }
          })
          .catch((ex) => {
            console.log("src/utils/AxiosInstance.js:94", ex);
            return retryWithGuest().then((data) => {
              axios.defaults.headers[
                "Authorization"
              ] = `Bearer ${data.payload?.codes?.accessToken}`;
              return instance(originalRequest);
            });
          })
          .finally(() => {
            refreshInProcess = false;
          });
      } else {
        return retryWithGuest().then((data) => {
          console.log("dataaa", data);
          axios.defaults.headers[
            "Authorization"
          ] = `Bearer ${data.payload?.codes?.accessToken}`;
          console.log("datadata", data);
          return instance(originalRequest);
        });
      }
    } else {
      console.log("src/utils/AxiosInstance.js:115", error);
      return Promise.reject(error);
    }
  }
);

export default instance;
