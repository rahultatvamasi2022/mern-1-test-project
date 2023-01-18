import express from "express";

import {
  getUserProfile,
  getUserDetails,
  allUsers,
} from "../controllers/user.controllers.js";
import authenticate from "../helpers/authenticate.js";

const router = express.Router();

router.route("/users").get(authenticate.isAuthenticateUser, allUsers);
router.route("/profile").get(authenticate.isAuthenticateUser, getUserProfile);
router.route("/user").get(authenticate.isAuthenticateUser, getUserDetails);

export default router;
