import {
  SET_USER_DATA,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_USER_TOKEN,
  UPDATE_USER_DATA,
} from "../types";

const initialState = {
  codes: {},
  customer: {},
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        codes: {
          ...state.codes,
        },
        customer: {
          ...action.payload,
        },
        isAuthenticated: state.isAuthenticated,
      };
    case SIGNUP:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        codes: {},
        customer: {},
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        ...action.payload,
      };

    case REFRESH_USER_TOKEN:
      return {
        ...state,
        customer: {
          ...state.customer,
          ...action.payload,
        },
      };

    case LOGOUT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
