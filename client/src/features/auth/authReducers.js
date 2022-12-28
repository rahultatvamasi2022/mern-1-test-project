import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from "./authContants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
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
        user: action.payload.user,
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
    default:
      return state;
  }
};
