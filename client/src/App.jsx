import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Context from "./context/context";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { loadProfile } from "./features/auth/authActions";
import store from "./store";
import ChatBox from "./components/ChatBox";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App() {
  // const CurrentUserChat = createContext(null);

  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    store.dispatch(loadProfile());
  }, []);

  return (
    <>
      <Context.Provider value={{ currentChat, setCurrentChat }}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="project" element={<Projects />} />
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/chat/:id" element={<ChatBox />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
