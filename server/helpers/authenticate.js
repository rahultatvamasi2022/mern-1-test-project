import User from "../models/user.model.js";

// const publicKey = fs.readFileSync("../public.key", "utf-8");

const isAuthenticateUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send({
        message: "Login please",
      });
    }

    req.user = req.session.userId;

    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const authenticate = {
  isAuthenticateUser,
};

export default authenticate;
