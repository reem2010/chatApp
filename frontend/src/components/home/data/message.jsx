// i need chat to contain id, name
import React, { useState, useEffect } from "react";

const Message = ({ socket, chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getInitialMessages();

    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, chatId]);

  const getInitialMessages = async () => {
    try {
      const initialMessages = await getMessages(chatId);
      setMessages(initialMessages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  const sendMessage = async (content) => {
      await createMessage({ chatId, content });
  };

  return (
    <div className="message-container">
      <h1>Messages</h1>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message-item">
            <p>{message.content}</p>
            <p>From: {message.sender}</p>
          </div>
        ))}
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

const MessageInput = ({ sendMessage }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      sendMessage(content);
      setContent(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Message;


export const getMessages = async (chatID) => {
  const res = await fetch(`${import.meta.env.VITE_Host}message/?chatId=${chatID}`, {
    credentials: "include",
  });
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
