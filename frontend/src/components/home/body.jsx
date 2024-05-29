import { useState, useEffect } from "react";
import { getMessages, createMessage } from "./data/message";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./styles/body.css";

const ChatBody = ({ chatData, socket }) => {
  
  const [msg, setMsg] = useState("");
  const [msgrec, setMsgrec] = useState(false);
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
      socket.current.emit('send-msg', {to: chatData.to, msg: msg})
      setupdate(!update)
    }
    setMsg("");
  };

  useEffect(() => {
    // console.log('again')
    if(chatData){
      getMessages(chatData.chatId).then((msgs) => {
        setmessages(msgs)
      })
    }
    // const ele = document.querySelector('.chatBox'); // Replace with your element's ID
    // ele.scroll({
    // top: ele.scrollHeight + 20,
    // behavior: 'smooth'
    // });
    
  },[update, chatData, msgrec]);

  useEffect(() => {
    const ele = document.querySelector('.chatBox'); // Replace with your element's ID
    messages &&  ele.scroll({
      top: ele.scrollHeight + 20,
      behavior: 'smooth'
      });
  }, [messages])  
  useEffect(() => {
    if(socket.current){
      socket.current.on('msg-recieve', (msg) => {
        // console.log(msg)
        setupdate(!update)
      })
    }
  })
  return (
    <div className="chatBody">
      <div className="chat-name">
        {chatData ? <h3>{chatData.chatName}</h3> : <h3>No selected chat</h3>}
      </div>
      <div className="chatBox">
        {messages && messages.map(mes => {
          const plusClass = mes.userId === +localStorage.getItem('userId') ? 'me-msg' : ""
          const classes = "message"+ " " + plusClass
          return (<div className={ classes } key={mes.id}>
            <h4 className="sender-name">{mes.user.name}</h4>
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
