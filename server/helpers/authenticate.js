import Auth from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const isAuthenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        message: "Please login to access this website",
      });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Auth.findById(decodeData.id);

    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const authenticate = {
  isAuthenticateUser,
};

export default authenticate;
