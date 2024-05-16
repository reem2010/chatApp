import { useState } from "react";
import HomeHead from "./header";
import { Sidebar } from "./sidebar";
import ChatBody from "./body";
import "./styles/home.css";

const Home = () => {
  const [chatData, setChatData] = useState(null);
  const updateSelectedChat = async (data) => {
    setChatData(data);
  };
  return (
    <div className="Home">
      <HomeHead />
      <div className="home-content">
        <Sidebar updateSelectedChat={updateSelectedChat} />
        <ChatBody chatData={chatData} />
      </div>
    </div>
  );
};
export default Home;
