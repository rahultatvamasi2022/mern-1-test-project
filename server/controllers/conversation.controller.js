import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const newConversation = async (req, res) => {
  try {
    const prevConversation = await Conversation.findOne({
      members: { $all: [req.user, req.body.receiverId] },
    });

    if (prevConversation) {
      return res.status(400).send({
        message: "Your previous conversation",
      });
    }
    // const receiverId = await User.findById(req.body.receiverId);

    // if (!receiverId) {
    //   return res.status(404).send({
    //     message: "User not found",
    //   });
    // }

    const newConversation = await Conversation.create({
      members: [req.user, req.body.receiverId],
      chatwith: "single",
    });

    const { updatedAt, __v, ...conversation } = newConversation._doc;

    res.status(201).send(conversation);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const newGroupConversation = async (req, res) => {
  try {
    if (!req.body.chatname) {
      return res.status(406).send({
        message: "Group chat name is required",
      });
    }

    let newConversation = await Conversation.create({
      chatname: req.body.chatname,
      members: [req.user, ...req.body.members],
      chatwith: "group",
    });

    const { updatedAt, __v, ...conversation } = newConversation._doc;

    res.status(201).send(conversation);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getConversationGroup = async (req, res) => {
  try {
    if (!req.query.conversationId) {
      return res.sendStatus(204);
    }

    const conversationGroup = await Conversation.findOne({
      _id: req.query.conversationId,
      chatwith: "group",
    });

    if (!conversationGroup) {
      return res.status(404).send({
        message: `${req.query.conversationId} not found`,
      });
    }

    const { updatedAt, __v, ...conversation } = conversationGroup._doc;

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const addUserInGroupConversation = async (req, res) => {
  try {
    if (!req.query.conversationId || req.body.members.length === 0) {
      return res.sendStatus(204);
    }

    const conversationGroup = await Conversation.findOne({
      _id: req.query.conversationId,
      chatwith: "group",
    });

    // console.log(conversationGroup);

    if (!conversationGroup) {
      return res.status(404).send({
        message: `${req.query.conversationId} not found`,
      });
    }

    let members = [...conversationGroup.members];

    for (let i = 0; i < req.body.members.length; i++) {
      if (!members.includes(req.body.members[i])) {
        members.push(req.body.members[i]);
      }
    }

    await conversationGroup.updateOne(
      { $set: { members: members } },
      {
        new: true,
        runValidators: true,
        returnDocument: "after",
        useFindAndModify: false,
      }
    );

    const {
      _doc: { updatedAt, __v, ...conversation },
    } = await conversationGroup.save();

    console.log(conversation);

    res.status(201).send(conversation);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const userConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find(
      {
        members: { $in: [req.user] },
      },
      {
        updatedAt: 0,
        __v: 0,
      }
    );

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get conversation between logged in user and other single user
export const isPrevConversationUser = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.user, req.query.receiverId], $size: 2 },
      chatwith: "single",
    });

    if (!conversation) {
      return res.status(404).send({
        message: "Not found",
      });
    }

    const { updatedAt, __v, ...data } = conversation._doc;

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const findAllConversationUser = async (req, res) => {
  try {
    const conversations = await Conversation.find(
      {
        members: { $in: [req.user] },
        chatwith: "single",
      },
      { updatedAt: 0, __v: 0 }
    );

    res.status(200).send(conversations);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
