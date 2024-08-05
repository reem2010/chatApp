import "./styles/auth.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
async function clicked(e, nav) {
  e.preventDefault();
  const email = e.target.children.email.value;
  const pass = e.target.children.pass.value;
  const virfy_pass = e.target.children.checkpass.value;
  const user = e.target.children.user.value;
  async function post_data() {
    const deleted = document.querySelectorAll(".form-container p");
    deleted.forEach((e) => {
      e.remove();
    });
    if (email < 10) {
      const element = document.createElement("p");
      element.innerHTML = "email should at least 10 character";
      document.querySelector(".form-container").append(element);
    }
    if (pass != virfy_pass) {
      const element = document.createElement("p");
      element.innerHTML = "password not match";
      document.querySelector(".form-container").append(element);
    }
    if (pass.length < 8) {
      const element = document.createElement("p");
      element.innerHTML = "password should at least 8 character";
      document.querySelector(".form-container").append(element);
    }
    if (pass.length < 8 || pass != virfy_pass || email < 10) {
      return;
    }
    let post = await fetch(`${import.meta.env.VITE_Host}auth/register`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
        username: user,
      }),
    });
    let data = post;
    if (data.status === 400) {
      const p = document.createElement("p");
      p.innerHTML = "data.message";
      const form_ele = document.querySelector(".form-container");
      form_ele.append(p);
      return;
    } else if (data.status == 201) {
      nav("/home");
    }
  }
  post_data();
}
async function for_login_path(nav) {
  console.log("done");
  nav("/");
}
const SignUp = () => {
  const nav = useNavigate();
  return (
    <div className="page">
      <header>
        <div className="auth-container">
          <img className="logo" src="/logo.png" alt="logo" />
          <h1>ChatApp</h1>
        </div>
      </header>
      <div className="form-container">
        <div className="app-name">
          <p>Sign Up</p>
        </div>
        <form onSubmit={(e) => clicked(e, nav)}>
          <label htmlFor="user">Username</label>
          <input type="text" id="user" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" min="10" required />
          <label htmlFor="pass">Password</label>
          <input type="password" min="8" max="50" id="pass" required />
          <label htmlFor="check-pass">re-password</label>
          <input type="password" min="8" max="50" id="checkpass" required />
          <input type="submit" value="Start Chatting" />
        </form>
        <Link to="/">Already have an account</Link>
      </div>
    </div>
  );
};
export default SignUp;
