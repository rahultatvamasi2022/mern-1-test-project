import React, { useState } from "react";

const Main = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log("Create new");
  };

  return (
    <main className="w-full h-[540px] flex justify-center my-16">
      <section className="w-[600px] h-full">
        <img
          src="https://liontrex.com/images/user/signup.png"
          alt="Sign Up Page"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="w-[500px] h-full">
        <div className="w-full flex flex-col">
          <h1 className="text-xl text-primary font-bold">Sign Up</h1>
          <h3 className="text-[16px] text-secondary mt-2">
            Create your new account
          </h3>
          <form
            className="w-full text-primary text-md font-normal"
            onSubmit={handleSignUp}
          >
            <div className="w-full flex py-3">
              <div className="w-full flex flex-col mr-3">
                <label>First Name</label>
                <input
                  className="h-12 px-2 text-md outline-none border border-inputBorder rounded-md "
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label>Last Name</label>
                <input
                  className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col py-3">
              <label>Email Address</label>
              <input
                className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Confirm Email Address</label>
              <input
                className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Password</label>
              <input
                className="h-12 px-2 outline-none border border-inputBorder rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
