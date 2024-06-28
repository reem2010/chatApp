import * as ChatModel from "../models/chatModels.js";
import { get_user } from "../models/userModels.js";
import {io} from "../app.js"

export const allChat = async (req, res) => {
  const userId = req.userId;
  let chats = await ChatModel.getChats(userId);
  chats = chats.map((chat) => {
    if (chat.name === "") {
      const rec = chat.members.filter((mem) => {
        return mem.user.id != userId;
      });
      chat.name = rec[0].user.name;
      chat.to = rec[0].user.id
    }
    return {
      id: chat.id,
      name: chat.name,
      to: chat.to
    };
  });
  console.log(chats)
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
  const chat = await ChatModel.createChat(senderId, user.id);
  io.emit('chat created', { id: chat.id, name: user.name });
  res.status(200).json({ message: "chat created successfully" });
};
export const deleteChat = async (req, res) => {
  const chatId = req.params.chatId;
  if (await ChatModel.deleteChat(+chatId)) {
    io.emit('chat deleted', { id: chatId });
    return res.status(200).json({ message: "chat deleted successfully" });
  }
  res.status(404).json({ message: "chat doesn't exist" });
};
