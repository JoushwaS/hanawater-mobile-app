import { TOGGLE_LOADER, SET_LANG, SET_TERMS } from "../types";

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

const setTermsData = (payload) => {
  return {
    type: SET_TERMS,
    payload,
  };
};

export { toggleLoader, setLang, setTermsData };
