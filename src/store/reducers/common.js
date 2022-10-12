import { SET_LANG, SET_TERMS, TOGGLE_LOADER } from "../types";

const initialState = {
  lang: "",
  isLoading: false,
  terms: "",
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

    default:
      return state;
  }
};
