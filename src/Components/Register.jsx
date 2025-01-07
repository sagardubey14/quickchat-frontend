import { Link, useNavigate } from "react-router-dom";
import "./CSS/Form.css";
import axios from "axios";
import { useState } from "react";

function Register() {
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  async function makePostRequest() {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        email,
        username,
        pass,
        frnds:[],
        lastOnline: new Date().toISOString(),
      });
      console.log(response);
      navigate('/');
    } catch (error) {
      if (error.response) {
        if(error.response.status === 401){
          setError('username')
        }else if(error.response.status === 402){
          setError('email')
        }
        console.log('Error:', error.response.data.message);
    } else {
        setError('other')
        console.error('Unexpected error:', error);
    }
    } finally{
      setLoading(false);
    }
  }

  const handleFormSubmit=()=>{
    if(loading) return;
    if(email === '' || username === '') return;

    if(pass.length < 8){
      setError('password')
      return;
    }
    makePostRequest();
  }
  
  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter your email" required/>
        {error ==='email' && <label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Email already exists</label>}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value.toLocaleLowerCase())} id="username" placeholder="Enter your username" />
        {error ==='username' && <label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Username already exists</label>}
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
        {error ==='password' &&<label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Your password must be at least 8 characters.</label>}
      </div>
      {error ==='other' &&<label style={{color:'red', marginTop:'5px', fontWeight:'lighter'}}>Network Error try again later.</label>}
      <button onClick={handleFormSubmit}>{loading ? 'loading...': 'Register'}</button>
      <p className="reactLinkText" >Already Registered? <Link className="reactLink" to="/">Login</Link></p>
    </div>
  );
}

export default Register;
