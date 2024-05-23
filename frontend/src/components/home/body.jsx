import { useState, useEffect } from "react";
import { getMessages, createMessage } from "./data/message";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./styles/body.css";
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_Host);

const ChatBody = ({ chatData }) => {
  
  const [msg, setMsg] = useState("");
  const [visible, setvisible] = useState(false);
  const [messages, setmessages] = useState(null);
  const [update, setupdate] = useState(false);
  const handleEmojiclick = (emoji) => {
    const newmsg = msg + emoji.emoji;
    setMsg(newmsg);
  };
  const handleSubmit = async () => {
    if(chatData){
      await createMessage({
        chatId: chatData.chatId,
        content: msg,
      })
      setupdate(!update)
    }
    setMsg("");
  };

  useEffect(() => {
    if(chatData){
      socket.emit('join chat', chatData.chatId);

      getMessages(chatData.chatId).then((msgs) => {
        setmessages(msgs)
      });
      socket.on('new message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  },[update, chatData])
  return (
    <div className="chatBody">
      <div className="chat-name">
        {chatData ? <h3>{chatData.chatName}</h3> : <h3>No selected chat</h3>}
      </div>
      <div className="chatBox">
        {messages && messages.map(mes => {
          return(<div className="message" key={mes.id}>
            <h4>{mes.user.name}</h4>
            <p>{mes.content}</p>
          </div>)
        })}
      </div>
      <div className="chatInput">
        <div className="smile">
          <BsEmojiSmileFill
            className={`smileIcon`}
            onClick={() => {
              setvisible(!visible);
            }}
          />
          {visible && (
            <Picker className="emoji-picker" onEmojiClick={handleEmojiclick} />
          )}
        </div>
        <input
          className="msgInput"
          placeholder="Write your message"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        ></input>
        <button className="msg-send" onClick={handleSubmit}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};
export default ChatBody;
