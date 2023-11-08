import Conversation from "../models/Conversation.js";

export const newConv = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
}

export const userConvs = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    })
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
}

export const getTwoUserConv = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] }
    })
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
}