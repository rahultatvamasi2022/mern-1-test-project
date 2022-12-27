import Auth from "../models/auth.model.js";
import errorHandler from "../helpers/errorHandlers.js";

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(new Date().getTime() + 10 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).send({
    token,
  });
};

export const signUpUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, confirmEmail, password } = req.body;

    if (email) {
      const oldUser = await Auth.findOne({ email }).select("-password");

      if (oldUser) {
        return res.status(406).send({
          success: false,
          success: false,
          message: "User already exists",
        });
      }

      if (email !== confirmEmail) {
        return (
          res.status(422),
          send({ success: false, message: "Email's does not match" })
        );
      }
    }

    const user = await Auth.create({ firstname, lastname, email, password });

    sendToken(user, 201, res);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(406)
        .send({ success: false, message: "All fields are required" });
    }

    const user = await Auth.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }

    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: `User does not found` });
    }

    res.status(200).send({
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const signOutUser = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).send({ success: true, message: "Logged out" });
};
