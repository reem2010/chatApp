import * as ChatModel from "../models/chatModels.js";
import { get_user } from "../models/userModels.js";

export const allChat = async (req, res) => {
  const userId = req.userId;
  const chats = await ChatModel.getChats(userId);
  res.status(200).json(chats);
};

export const createChat = async (req, res) => {
  const senderId = req.userId;
  const { recieverEmail } = req.body;
  const user = await get_user(recieverEmail);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exist" });
  }
  if (await ChatModel.getChat(senderId, user.id)) {
    return res.json({ message: "chat already exist" });
  }
  const chat = await ChatModel.createChat(senderId, +recieverId);
  res.status(200).json({ message: "chat created successfully" });
};
export const deleteChat = async (req, res) => {
  const chatId = req.params.chatId;
  if (ChatModel.deleteChat(chatId)) {
    return res.status(200).json({ message: "chat deleted successfully" });
  }
  res.status(404).json({ message: "chat doesn't exist" });
};