import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { signIn, signUp } from "../../features/auth/authActions";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading, isSuccess, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    dispatch(
      signUp(
        user.firstname,
        user.lastname,
        user.email,
        user.confirmEmail,
        user.password
      )
    );
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    dispatch(signIn(user.email, user.password));

    // console.log("Signin");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main
      className={`w-full h-[540px] flex ${
        location.pathname === "/signup" ? "flex-row" : "flex-row-reverse"
      } justify-center my-16`}
    >
      <section className="w-[600px] h-full">
        <img
          src="https://liontrex.com/images/user/signup.png"
          alt="Sign Up Page"
          className="w-full h-full object-cover"
        />
      </section>
      <section className={`w-[500px] h-full items-center`}>
        <div className={`w-full h-full flex flex-col justify-center `}>
          <h1 className="text-xl text-primary font-bold">
            {location.pathname === "/signup" ? "Sign Up" : "Login"}
          </h1>
          {location.pathname === "/signup" && (
            <h3 className="text-[16px] text-secondary mt-2">
              Create your new account
            </h3>
          )}
          <form
            className={`w-full text-primary text-md font-normal`}
            onSubmit={
              location.pathname === "/signup" ? handleSignUp : handleSignIn
            }
          >
            {location.pathname === "/signup" && (
              <div className="w-full flex py-3">
                <div className="w-full flex flex-col mr-3">
                  <label>First Name</label>
                  <input
                    className="h-12 px-2 text-md outline-none border border-inputBorder rounded-md "
                    type="text"
                    value={user.firstname}
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label>Last Name</label>
                  <input
                    className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                    type="text"
                    value={user.lastname}
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col py-3">
              <label>Email Address</label>
              <input
                className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            {location.pathname === "/signup" && (
              <div className="flex flex-col py-3">
                <label>Confirm Email Address</label>
                <input
                  className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                  type="email"
                  value={user.confirmEmail}
                  onChange={(e) =>
                    setUser({ ...user, confirmEmail: e.target.value })
                  }
                />
              </div>
            )}
            <div className="flex flex-col py-3">
              <label>Password</label>
              <input
                className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="h-12 flex items-center justify-center text-white text-lg font-bold my-4 rounded-md bg-buttonBackground">
              <button type="submit" className="w-full h-full">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Main;
