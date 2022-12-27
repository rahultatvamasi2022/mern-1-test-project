import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";

const reducer = combineReducers({
  auth: authReducer,
});

export default configureStore({
  reducer,
});
