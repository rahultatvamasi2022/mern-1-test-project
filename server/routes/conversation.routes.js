import express from "express";

import {
  newConversation,
  userConversation,
  isPrevConversationUser,
  newGroupConversation,
  addUserInGroupConversation,
  getConversationGroup,
  findAllConversationUser,
} from "../controllers/conversation.controller.js";
import authenticate from "../helpers/authenticate.js";

const router = express.Router();

router
  .route("/conversation")
  .post(authenticate.isAuthenticateUser, newConversation);

router
  .route("/group/conversation")
  .post(authenticate.isAuthenticateUser, newGroupConversation)
  .put(authenticate.isAuthenticateUser, addUserInGroupConversation)
  .get(authenticate.isAuthenticateUser, getConversationGroup);

router
  .route("/user/conversations")
  .get(authenticate.isAuthenticateUser, userConversation);

router
  .route("/user/conversation")
  .get(authenticate.isAuthenticateUser, isPrevConversationUser);

router
  .route("/user/all/conversations")
  .get(authenticate.isAuthenticateUser, findAllConversationUser);

export default router;
