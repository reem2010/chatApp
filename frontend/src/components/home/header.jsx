import { getUser, logout } from "./data/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";

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
      localStorage.removeItem("userId");
      nav("/");
    });
  };
  return (
    <header id="HEADER">
      <div className="container">
        <div className="header-content">
          <Menu
            className="menu"
            onClick={() => {
              closeSidebar(!closed);
            }}
          />
          <img className="logo" src="/logo2.png" alt="logo" />
          <h2>ChatApp</h2>
        </div>
        <div className="header-content">
          <div className="me">
            <div className="online"></div>
            <h3 className="name">{name}</h3>
          </div>
          <IoLogOutOutline className="logout" onClick={logoutAction} />
        </div>
      </div>
    </header>
  );
};
export default HomeHead;
