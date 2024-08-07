export const getChats = async () => {
  const res = await fetch(`${import.meta.env.VITE_Host}chats/`, {
    credentials: "include",
  });
  const chats = await res.json();
  return chats;
};

export const deleteChat = async (chatId) => {
  await fetch(`${import.meta.env.VITE_Host}chats/${chatId}`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createChat = async (data) => {
  await fetch(`${import.meta.env.VITE_Host}chats/`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
