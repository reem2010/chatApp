import { useState, useRef, useEffect } from "react";
import HomeHead from "./header";
import { Sidebar } from "./sidebar";
import { ToastContainer } from "react-toastify";
import ChatBody from "./body";
import "./styles/home.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [chatData, setChatData] = useState(null);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = (val) => {
    setClosed(val);
  };
  const updateSelectedChat = async (data) => {
    setChatData(data);
  };
  const socket = useRef();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      console.log("hi");
      navigate("/");
    }
    socket.current = io(import.meta.env.VITE_Host);
    socket.current.emit("add-user", localStorage.getItem("userId"));
  }, []);
  return (
    <div className="Home">
      <HomeHead closeSidebar={closeSidebar} closed={closed} />
      <div className="home-content">
        <Sidebar
          closeSidebar={closeSidebar}
          closed={closed}
          updateSelectedChat={updateSelectedChat}
        />
        <ChatBody chatData={chatData} socket={socket} />
      </div>
      <ToastContainer />
    </div>
  );
};
export default Home;
