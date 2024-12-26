import { Link } from "react-router-dom";
import "./CSS/Form.css";

function Login() {
  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>

      <button onClick={() => console.log("button")}>Login</button>
      <p className="reactLinkText" >Not Registered yet? <Link className="reactLink" to="/register">Register</Link></p>
    </div>
  )
}

export default Login
