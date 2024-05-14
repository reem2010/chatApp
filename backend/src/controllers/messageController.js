import * as messageModel from "../models/messageModels.js";
import { get_user } from "../models/userModels.js";

export const getMessages = async (req, res) => {
  const chatId = req.query.chatId;
  const messages = await messageModel.getMessages(+chatId);
  res.status(200).json(messages);
};

export const createMessage = async (req, res) => {
  const senderId = req.userId;
  const { chatId, content } = req.body;
  const message = await messageModel.createMessage(senderId, chatId, content);
  res
    .status(200)
    .json({ message: "message created successfully", data: message });
};