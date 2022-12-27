import express from "express";

import {
  signUpUser,
  signInUser,
  getUserProfile,
  signOutUser,
} from "../controllers/auth.controllers.js";
import authenticate from "../helpers/authenticate.js";

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/profile").get(authenticate.isAuthenticateUser, getUserProfile);
router.route("/signout").get(authenticate.isAuthenticateUser, signOutUser);

export default router;
