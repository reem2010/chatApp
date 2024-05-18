import "../../style/signup.css";
async function clicked(e) {
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
    if (data.status == 201) {
      window.location.replace("http://localhost:5173/login");
    }
  }
  post_data();
}
const SignUp = () => {
  return (
    <div className="form-container">
      <div className="app-name">
        <p>Chat app</p>
      </div>
      <form onSubmit={clicked}>
        <label htmlFor="user">Username</label>
        <input type="text" id="user" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" min="10" required />
        <label htmlFor="pass">Password</label>
        <input type="password" min="8" max="50" id="pass" required />
        <label htmlFor="check-pass">re-password</label>
        <input type="password" min="8" max="50" id="checkpass" required />
        <input type="submit" value="signup" />
      </form>
    </div>
  );
};
export default SignUp;
