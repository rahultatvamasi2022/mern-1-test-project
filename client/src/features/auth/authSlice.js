import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../services/auth.service";

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ firstname, lastname, email, confirmEmail, password }) => {
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await AuthService.signUp(
        { firstname, lastname, email, confirmEmail, password },
        config
      );

      return response.data;
    } catch (error) {
      const message = error.response.data;
      return message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },

  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.isLoggedIn = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      //   state.user = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoggedIn = false;
      //   state.user = null;
      //   state.error = action.payload;
    },
  },
});

const { reducer } = authSlice;

export default reducer;

//   reducers: {
//     signUp: (state, action) => {},
//     getProfile: (state, action) => {},
//     signOut: (state, action) => {},
//   },
