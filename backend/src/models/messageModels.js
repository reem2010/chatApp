import { prisma } from "./client.js";

export const getMessages = async (chatId) => {
  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return messages;
};

export const createMessage = async (userId, chatId, content) => {
  try {
    const message = await prisma.message.create({
      data: {
        userId: userId,
        chatId: chatId,
        content: content,
      },
    });
    return message;
  } catch (err) {
    return null;
  }
};
