import "./styles/header.css";
import { getUser } from "./data/user";
import { useNavigate } from "react-router-dom";
function logoutAction(nav) {
  nav('/')
}
const HomeHead = () => {
  const nav = useNavigate();
  return (
    <header id="HEADER">
      <div className="container">
  <ul className="nav-bar">
    <li>Chat app</li>
    <button className="pointer" onClick={()=> logoutAction(nav)}>logout</button>
  </ul>
      </div>
    </header>
  );
};
export default HomeHead;
