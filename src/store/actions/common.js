import {
  TOGGLE_LOADER,
  SET_LANG,
  SET_TERMS,
  SET_RETURN_POLICY,
} from "../types";

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

const setReturnPolicyData = (payload) => {
  return {
    type: SET_RETURN_POLICY,
    payload,
  };
};

export { toggleLoader, setLang, setTermsData, setReturnPolicyData };
