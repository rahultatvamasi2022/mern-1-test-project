import Message from "../models/message.model.js";

export const newMessage = async (req, res) => {
  try {
    req.body.senderId = req.user;

    const message = await Message.create(req.body);

    res.status(201).send(message);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getAllConversationMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.query.conversationId,
    });

    // for(let i = 0; i < )

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
