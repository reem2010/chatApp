import "./styles/header.css";
import { getUser } from "./data/user";
import { useNavigate } from "react-router-dom";
async function logoutAction(nav) {
  document.cookie = ''
  nav('/')
}
const HomeHead = () => {
  const nav = useNavigate();
  return (
    <header id="HEADER">
      <div className="container">
        <h2>ChatApp</h2>
        <button className="pointer" onClick={()=> logoutAction(nav)}></button>
      </div>
    </header>
  );
};
export default HomeHead;
