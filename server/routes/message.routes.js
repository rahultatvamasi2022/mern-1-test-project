import express from "express";

import {
  newMessage,
  getAllConversationMessages,
} from "../controllers/message.controller.js";
import authenticate from "../helpers/authenticate.js";

const router = express.Router();

router.route("/messages").post(authenticate.isAuthenticateUser, newMessage);

router
  .route("/user/messages")
  .get(authenticate.isAuthenticateUser, getAllConversationMessages);

export default router;
