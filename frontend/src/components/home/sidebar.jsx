import { useState, useEffect } from "react";
import { getChats, deleteChat, createChat } from "./data/chat";
import { toast } from "react-toastify";
import "./styles/sidebar.css";

export const Sidebar = ({ updateSelectedChat, closeSidebar, closed }) => {
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
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const data = { recieverEmail: recEmail };
    let res = await createChat(data);
    if (!res.ok) {
      let body = await res.json();
      toast.error(body.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setupdate(!update);
  };
  return (
    <div className={`sidebar ${closed ? "closed" : ""}`}>
      <h3 className="chat-title">Chats</h3>
      <form className="new-chat" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Email you want to chat with.."
          value={recEmail}
          className="add-field"
          onChange={(ev) => {
            setrecEmail(ev.target.value);
          }}
        ></input>
        <button type="submit" className="add-mem">
          add
        </button>
      </form>
      <ul className="chats-menu">
        {chats &&
          chats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-name ${selected[chat.id] ? "selected" : ""}`}
              onClick={() => {
                updateSelectedChat({
                  chatName: chat.name,
                  chatId: chat.id,
                  to: chat.to,
                });
                setselected({ [chat.id]: true });
                closeSidebar(true);
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
                    setvisible({ [`${chat.id}-del`]: false });
                    setblur(false);
                  }}
                >
                  delete
                </button>
                <button
                  className="del-cancel"
                  onClick={() => {
                    setvisible({ [`${chat.id}-del`]: false });
                    setblur(false);
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
