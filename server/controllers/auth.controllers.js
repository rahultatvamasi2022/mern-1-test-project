import argon2 from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import errorHandler from "../helpers/errorHandlers.js";

const sendToken = (user, statusCode, req, res) => {};

export const signUpUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, confirmEmail, password } = req.body;

    if (email) {
      const existsEmail = await User.findOne({ email });

      if (existsEmail) {
        return res.status(406).send({
          error: "User already exists",
        });
      }

      if (email !== confirmEmail) {
        return res.status(406).send({
          error: "Email fields does not match",
        });
      }
    }

    const userDoc = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    req.session.userId = userDoc.id;
    req.session.loginTime = new Date(Date.now());

    res.status(201).send({
      message: "Signed Up successfully",
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    // const { email, password } = req.body;

    if (!req.body.email || !req.body.password) {
      return res.status(406).send({
        error: "All fields are required",
      });
    }

    const userDoc = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!userDoc) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const matchPassword = await verifyPassword(
      userDoc.password,
      req.body.password
    );

    if (!matchPassword) {
      return res.status(401).send({
        error: "Invalid credentials",
      });
    }

    req.session.userId = userDoc.id;
    req.session.loginTime = new Date(Date.now());

    const { updatedAt, __v, ...user } = userDoc._doc;

    res.status(201).send({
      message: "Logged-in",
      user,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const signOutUser = async (req, res, next) => {
  req.session.destroy(null);

  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).send({ message: "Logged out" });
};

const verifyPassword = async (hashPassword, password) => {
  return await argon2.verify(hashPassword, password);
};
