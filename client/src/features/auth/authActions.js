import axios from "axios";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from "./authContants";

export const signUp =
  (firstname, lastname, email, confirmEmail, password) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const { data } = await axios.post(
        "http://localhost:4000/api/signup",
        { firstname, lastname, email, confirmEmail, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.response.data });
    }
  };

export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });

    const { data } = await axios.post(
      `http://localhost:4000/api/signin`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.response.data });
  }
};
