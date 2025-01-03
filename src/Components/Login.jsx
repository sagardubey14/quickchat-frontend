import { Link, useNavigate } from "react-router-dom";
import "./CSS/Form.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from './store/UserContext'


function Login() {
  const {username, setUsername} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  useEffect(()=>{
    if(username){
      navigate('/chat');
    }
  },[]);

  async function makePostRequest() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        pass
      });
      setUsername(response.data.username);
      navigate('/chat');

    } catch (error) {
      console.log(error);
    }
  }

  function handleLogin (){
    makePostRequest();
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
          value={pass}
          onChange={(e)=> setPass(e.target.value)}
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
