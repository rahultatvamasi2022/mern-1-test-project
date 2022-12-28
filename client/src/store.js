import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./features/auth/authReducers";

const reducer = combineReducers({
  auth: authReducer,
});

export default configureStore({
  reducer,
});
