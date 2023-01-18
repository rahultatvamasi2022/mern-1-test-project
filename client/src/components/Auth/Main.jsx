import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { signIn, signUp } from "../../features/auth/authActions";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

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

    if (error) {
      toast.error(error.error);
    }
  }, [isAuthenticated, navigate, error]);

  // console.log(error);

  return (
    <main
      className={`w-full h-[540px] flex ${
        location.pathname === "/signup" ? "flex-row" : "flex-row-reverse"
      } justify-center my-16`}
    >
      <section className="w-[600px] h-full hidden lg:flex">
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
                    className={`${
                      error?.error?.firstname || error?.error
                        ? "h-12 px-2 text-md outline-none border border-dangerBorder rounded-md"
                        : "h-12 px-2 text-md outline-none border border-inputBorder rounded-md "
                    }`}
                    type="text"
                    value={user.firstname}
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                  />
                  <p className="text-sm text-danger font-normal">
                    <span>{error?.error?.firstname}</span>
                  </p>
                </div>
                <div className="w-full flex flex-col">
                  <label>Last Name</label>
                  <input
                    className={`${
                      error?.error?.lastname || error?.error
                        ? "h-12 px-2 text-md outline-none border border-dangerBorder rounded-md"
                        : "h-12 px-2 text-md outline-none border border-inputBorder rounded-md "
                    }`}
                    type="text"
                    value={user.lastname}
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                  />
                  <p className="text-sm text-danger font-normal">
                    <span>{error?.error?.lastname}</span>
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col py-3">
              <label>Email Address</label>
              <input
                className={`${
                  error?.error?.email || error?.error
                    ? "h-12 px-2 outline-none border border-dangerBorder rounded-md"
                    : "h-12 px-2 outline-none border border-inputBorder rounded-md"
                }`}
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <p>
                <span>{error?.error?.email}</span>
              </p>
            </div>

            {location.pathname === "/signup" && (
              <div className="flex flex-col py-3">
                <label>Confirm Email Address</label>
                <input
                  className={`${
                    error?.error?.email || error?.error
                      ? "h-12 px-2 outline-none border border-dangerBorder rounded-md"
                      : "h-12 px-2 outline-none border border-inputBorder rounded-md"
                  }`}
                  type="email"
                  value={user.confirmEmail}
                  onChange={(e) =>
                    setUser({ ...user, confirmEmail: e.target.value })
                  }
                />
                <p className="text-sm text-danger font-normal">
                  <span>{error?.email}</span>
                </p>
              </div>
            )}
            <div className="flex flex-col py-3">
              <label>Password</label>
              <input
                className={`${
                  error?.error?.password || error?.error
                    ? "h-12 px-2 text-md outline-none border border-dangerBorder rounded-md"
                    : "h-12 px-2 text-md outline-none border border-inputBorder rounded-md"
                }`}
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <p className="text-sm text-danger font-normal">
                <span>{error?.error?.password}</span>
              </p>
            </div>
            <div className="h-12 flex items-center justify-center text-white text-lg font-bold my-4 rounded-md bg-buttonBackground">
              <button type="submit" className="w-full h-full">
                {location.pathname === "/signup" ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
          <div className="w-full flex text-md">
            {location.pathname === "/signup" ? (
              <>
                <div className="w-full flex justify-center">
                  <p>Already have an account? </p>
                  <Link to="/signin" className="ml-1 text-[#69D600]">
                    Login
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex justify-center">
                  <p>Create an account? </p>
                  <Link to="/signup" className="ml-1 text-[#69D600]">
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
