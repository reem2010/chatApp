import { prisma } from "./client.js";

export const getChats = async (userId) => {
  const chats = await prisma.chat.findMany({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
  });
  return chats;
};

export const getChat = async (senderId, recieverId) => {
  const chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { members: { some: { userId: senderId } } },
        { members: { some: { userId: recieverId } } },
      ],
    },
  });
  console.log(chat);
  return chat;
};

export const updateChat = async (newName, chatId) => {
  try {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        name: newName,
      },
    });
    return chat;
  } catch {
    return null;
  }
};

export const deleteChat = async (chatId) => {
  try {
    const chat = await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
    return chat;
  } catch {
    return null;
  }
};

export const createChat = async (senderId, recieverId) => {
  try {
    const message = await prisma.chat.create({
      data: {
        name: "",
        members: {
          create: [
            {
              user: {
                connect: {
                  id: senderId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: recieverId,
                },
              },
            },
          ],
        },
      },
    });
    console.log(message);
    return message;
  } catch {
    return null;
  }
};
