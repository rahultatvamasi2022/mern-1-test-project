import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
} from "./authContants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isAuthenticated: false,
      };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGNOUT_SUCCESS:
      return {
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };
    case SIGNUP_FAILURE:
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
