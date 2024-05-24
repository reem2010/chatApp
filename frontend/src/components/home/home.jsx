import { useState, useRef, useEffect } from "react";
import HomeHead from "./header";
import { Sidebar } from "./sidebar";
import ChatBody from "./body";
import "./styles/home.css";
import io from 'socket.io-client';


const Home = () => {
  const [chatData, setChatData] = useState(null);
  const updateSelectedChat = async (data) => {
    setChatData(data);
  };
  const socket = useRef()
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_Host);
    socket.current.emit('add-user', localStorage.getItem('userId'))
  }, [])
  return (
    <div className="Home">
      <HomeHead />
      <div className="home-content">
        <Sidebar updateSelectedChat={updateSelectedChat} />
        <ChatBody chatData={chatData}  socket = {socket}/>
      </div>
    </div>
  );
};
export default Home;
