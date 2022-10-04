import axios from ".";
import Config from "./config";
import { Endpoints } from "../constants";

export const submitOrderRating = (body) => {
  return axios.post(Endpoints.SUBMIT_RATING, body, {
    headers: {
      "Content-type": "application/json",
      Authorization: Config.CLIENT_SECRET,
    },
  });
};
