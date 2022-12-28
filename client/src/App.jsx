import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { loadProfile } from "./features/auth/authActions";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/signin" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
