export const getMessages = async (chatID) => {
  const res = await fetch(
    `${import.meta.env.VITE_Host}message/?chatId=${chatID}`,
    {
      credentials: "include",
    }
  );
  const msgs = await res.json();
  return msgs;
};

export const createMessage = async (data) => {
  const res = await fetch(`${import.meta.env.VITE_Host}message`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
