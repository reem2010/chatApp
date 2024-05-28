import { Link } from "react-router-dom";
import "../../style/login.css";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let socket;

async function checked(e) {
  if (e.target.checked) {
    document.querySelector(".change").type = "text";
  } else {
    document.querySelector(".change").type = "password";
  }
}
async function clicked(e, nav) {
  e.preventDefault();
  const email = e.target.children.email.value;
  const pass = e.target.children.pass.value;
  async function post_data() {
    let post = await fetch(`${import.meta.env.VITE_Host}auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    let data = post;
    if (data.status == 200) {
      const user = await data.json()
      const userId = user.userId;
      localStorage.setItem('userId', userId);
      nav("/home");
    }
    else {
      toast.error('email or password is wrong', {
            position: "bottom-right"
          })
    }
  }
  post_data();
}
const Login = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="form-container">
        <div className="app-name">
          <p>Chat app</p>
        </div>
        <form onSubmit={(e) => clicked(e, nav)}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="pass">Password</label>
          <input className="change" type="password" id="pass" />
          <div>
            <input onClick={checked} type="checkbox" id="show-pass" />
            <label htmlFor="show-pass">show password </label>
          </div>
          <Link to="/signup">create accout</Link>
          <input type="submit" value="login" />
        </form>
        <ToastContainer/>
      </div>
    </>
  );
};
export default Login;
