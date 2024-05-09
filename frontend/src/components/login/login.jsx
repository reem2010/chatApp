import { Link } from 'react-router-dom'
import '../../style/login.css'

async function clicked(e) {
    e.preventDefault()
    const email = e.target.children.email.value
    const pass = e.target.children.pass.value
    async function post_data() {
        let post = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'email': email,
                'password': pass,
            })
        })
        let data = post
        console.log(data.status)
    }
    post_data()
}
const Login = () => {

    return (
        <>
        <div className="form-container">
            <div className='app-name'>
                <p>Chat app</p>
            </div>
                <form onSubmit={clicked}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
                <label htmlFor="pass">Password</label>
                <input type="password" id="pass"/>
                <div>
                    <input type="checkbox" id='show-pass'/>
                    <label htmlFor="show-pass">show password </label>
                </div>
                <Link to='/signup'>create accout</Link>
                <input type="submit" value='login'/>
                </form>
        </div>
        </>
    )
}
export default Login
