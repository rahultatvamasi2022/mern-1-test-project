import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
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
