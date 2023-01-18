import express from "express";

import {
  signUpUser,
  signInUser,
  signOutUser,
} from "../controllers/auth.controllers.js";
import authenticate from "../helpers/authenticate.js";

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
// router.route("/refreshtoken").post(newRefreshToken);
router.route("/signout").post(authenticate.isAuthenticateUser, signOutUser);

export default router;
