import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Home/Header";
import Main from "../components/Home/Main";
import Footer from "../components/Home/Footer";

const HomePage = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default HomePage;
