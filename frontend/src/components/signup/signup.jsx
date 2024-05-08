import '../../style/signup.css'
const SignUp = () => {
    return(
        <div className="form-container">
        <div className='app-name'>
            <p>Chat app</p>
        </div>
        <form action="/login" method='GET'>
            <label htmlFor="user">Username</label>
            <input type="text" id="user" required/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required/>
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" required/>
            <label htmlFor="check-pass">re-password</label>
            <input type="password" id="check-pass" required/>
            <input type="submit" value='signup'/>
        </form>
    </div>
    )
}
export default SignUp