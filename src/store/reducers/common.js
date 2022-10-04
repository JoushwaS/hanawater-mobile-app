import { SET_LANG, TOGGLE_LOADER } from "../types";

const initialState = {
  lang: "",
  isLoading: false,
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

    default:
      return state;
  }
};
