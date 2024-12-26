import { Link } from "react-router-dom";
import "./CSS/Form.css";

function Register() {
  return (
    <div className="center">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>

      <button onClick={() => console.log("button")}>Register</button>
      <p className="reactLinkText" >Already Registered? <Link className="reactLink" to="/">Login</Link></p>
    </div>
  );
}

export default Register;
