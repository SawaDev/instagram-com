import Message from "../models/Message.js";

export const newMessage = async (req, res, next) => {
  const newMessages = new Message(req.body);
  try {
    const savedMessage = await newMessages.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    next(err);
  }
}

export const getConvMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
}