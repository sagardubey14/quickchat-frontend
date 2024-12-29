import { Link, useNavigate } from "react-router-dom";
import "./CSS/Form.css";
import { useContext, useState } from "react";
import UserContext from './store/UserContext'


function Login() {
  const {setUsername} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  function handleLogin (){
    console.log('Api Request');
    setUsername(email);
    navigate('/chat');
  }

  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>

      <button onClick={handleLogin}>Login</button>
      <p className="reactLinkText" >Not Registered yet? <Link className="reactLink" to="/register">Register</Link></p>
    </div>
  )
}

export default Login
