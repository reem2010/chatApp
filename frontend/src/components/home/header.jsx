import "./styles/header.css";
import { getUser, logout } from "./data/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const HomeHead = ({ closeSidebar, closed }) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
    getUser().then((data) => {
      setName(data.name);
    });
  });
  const logoutAction = () => {
    logout().then(() => {
      nav("/");
    });
  };
  return (
    <header id="HEADER">
      <div className="container">
        <Menu
          className="menu"
          onClick={() => {
            closeSidebar(!closed);
          }}
        />
        <img className="logo" src="/logo.png" alt="logo" />
        <h2>ChatApp</h2>
        <div className="me">
          <div className="online"></div>
          <h3 className="name">{name}</h3>
        </div>
        <button className="logout" onClick={logoutAction}></button>
      </div>
    </header>
  );
};
export default HomeHead;
