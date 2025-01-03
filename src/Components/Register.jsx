import { Link, useNavigate } from "react-router-dom";
import "./CSS/Form.css";
import axios from "axios";
import { useState } from "react";

function Register() {
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[pass, setPass] = useState('');
  const navigate =useNavigate()

  async function makePostRequest() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        email,
        username,
        pass,
        frnds:[],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormSubmit=()=>{
    makePostRequest();
    navigate('/');
  }
  
  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter your email" />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} id="username" placeholder="Enter your username" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={pass} 
          onChange={(e)=>setPass(e.target.value)}
        />
      </div>

      <button onClick={handleFormSubmit}>Register</button>
      <p className="reactLinkText" >Already Registered? <Link className="reactLink" to="/">Login</Link></p>
    </div>
  );
}

export default Register;
