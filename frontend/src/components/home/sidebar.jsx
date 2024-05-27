import { useState, useEffect } from "react";
import { getChats, deleteChat, createChat } from "./data/chat";
import "./styles/sidebar.css";

export const Sidebar = ({ updateSelectedChat }) => {
  const [chats, setchat] = useState(null);
  const [visible, setvisible] = useState({});
  const [selected, setselected] = useState({});
  const [update, setupdate] = useState(false);
  const [blur, setblur] = useState(false);
  const [recEmail, setrecEmail] = useState("");
  useEffect(() => {
    getChats().then((chats) => {
      setchat(chats);
    });
  }, [update]);
  const handleDelete = async (chatId) => {
    const res = await deleteChat(chatId);
    setupdate(!update);
    setblur(false);
  };
  const handleCreate = async () => {
    const data = { recieverEmail: recEmail };
    await createChat(data);
    setupdate(!update);
  };
  return (
    <div className="sidebar">
      <h3 className="chat-title">chats</h3>
      <div className="new-chat">
        <input
          type="text"
          placeholder="Email you want to chat with.."
          value={recEmail}
          className="add-field"
          onChange={(ev) => {
            setrecEmail(ev.target.value);
          }}
        ></input>
        <button className="add-mem" onClick={handleCreate}>
          add
        </button>
      </div>
      <ul className="chats-menu">
        {chats &&
          chats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-name ${selected[chat.id] ? "selected" : ""}`}
              onClick={() => {
                console.log(chat)
                updateSelectedChat({
                  chatName: chat.name,
                  chatId: chat.id,
                  to: chat.to
                });
                setselected({ [chat.id]: true });
              }}
            >
              <div
                className={`del-conf ${
                  visible[`${chat.id}-del`] ? "visible" : ""
                }`}
              >
                <span>{`Are you sure you want to delete ${chat.name} chat`}</span>
                <button
                  className="del-conf-but"
                  onClick={() => {
                    handleDelete(chat.id);
                  }}
                >
                  delete
                </button>
                <button
                  className="del-cancel"
                  onClick={() => {
                    setblur(false);
                    setvisible({ [`${chat.id}-del`]: false });
                  }}
                >
                  cancel
                </button>
              </div>
              <span>{chat.name}</span>

              <button
                className="del-but"
                onClick={() => {
                  setblur(true);
                  setvisible({ [`${chat.id}-del`]: true });
                }}
              >
                <span>-</span>
              </button>
            </li>
          ))}
      </ul>
      <div className={`blur ${blur ? "visible" : ""}`}></div>
    </div>
  );
};
