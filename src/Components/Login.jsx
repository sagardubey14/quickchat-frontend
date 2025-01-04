import { Link, useNavigate } from "react-router-dom";
import "./CSS/Form.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from './store/UserContext'


function Login() {
  const {username, setUsername, setChatList} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(username){
      let confirmation = confirm(`Coninue as ${username}`);
      if(confirmation){
        navigate('/chat');
      }
    }
  },[]);

  async function makePostRequest() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        pass
      });
      setError(null);
      console.log(response);
      setUsername(response.data.username);
      setChatList({});
      navigate('/chat');

    } catch (error) {
      if (error.response) {
        if(error.response.status === 401){
          setError('password')
        }else if(error.response.status === 404){
          setError('email')
        }
        console.log('Error:', error.response.data.message);
      }else{
        setError('other')
        console.log(error);
      }
    }
  }

  function handleLogin (){
    console.log(import.meta.env.VITE_ADMIN_PASS);
    
    if(email === 'admin' && pass === import.meta.env.VITE_ADMIN_PASS){
      console.log('jai ho admin bhaiya');
      setUsername('admin')
      navigate(`/${import.meta.env.VITE_ADMIN_URL}`);
      return;
    }
    // if(pass.length < 8){
    //   setError('password')
    //   return;
    // }else{
    //   setError(null);
    // }
    makePostRequest();
  }

  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter your email" />
        {error ==='email' && <label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Email do not exists</label>}
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
        {error ==='password' &&<label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Password is incorrect.</label>}
      </div>
      {error ==='other' &&<label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Network Error try again later.</label>}
      <button onClick={handleLogin}>Login</button>
      <p className="reactLinkText" >Not Registered yet? <Link className="reactLink" to="/register">Register</Link></p>
    </div>
  )
}

export default Login
