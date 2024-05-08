import { Link } from 'react-router-dom'
import '../../style/login.css'

const Login = () => {
    console.log(document.querySelector('form'))
    return(

        <div className="form-container">
            <div className='app-name'>
                <p>Chat app</p>
            </div>
            <form action="/home" method="POST">
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
    )
}
export default Login