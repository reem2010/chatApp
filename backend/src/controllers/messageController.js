import * as messageModel from "../models/messageModels.js";

export const getMessages = async (req, res) => {
  const chatId = req.query.chatId;
  const messages = await messageModel.getMessages(+chatId);
  res.status(200).json(messages);
};

export const createMessage = async (req, res) => {
  const senderId = req.userId;
  const { chatId, content } = req.body;
  const message = await messageModel.createMessage(senderId, +chatId, content);
  if (!message) {
    return res.status(404).json({ message: "chat doesnt exist" });
  }
  res
    .status(200)
    .json({ message: "message created successfully", data: message });
};
