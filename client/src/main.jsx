import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer autoClose={5000} />
      </Router>
    </Provider>
  </>
);
