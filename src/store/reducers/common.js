import {
  SET_LANG,
  SET_TERMS,
  TOGGLE_LOADER,
  SET_RETURN_POLICY,
} from "../types";

const initialState = {
  lang: "",
  isLoading: false,
  terms: "",
  returnPolicies: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    case TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_TERMS:
      return {
        ...state,
        terms: action.payload,
      };
    case SET_RETURN_POLICY:
      return {
        ...state,
        returnPolicies: action.payload,
      };
      ``;

    default:
      return state;
  }
};
