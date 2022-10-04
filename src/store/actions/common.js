import { TOGGLE_LOADER, SET_LANG } from "../types";

const toggleLoader = (payload) => {
  return {
    type: TOGGLE_LOADER,
    payload,
  };
};

const setLang = (payload) => {
  return {
    type: SET_LANG,
    payload,
  };
};

export { toggleLoader, setLang };
