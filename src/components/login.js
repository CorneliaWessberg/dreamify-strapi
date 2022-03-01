import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

    const [loggValues, setLoggValues] = useState(initialValues);
    const [error, setError] = useState("");
    const history = useNavigate();

    function onChange(e) {
      setLoggValues({ ...loggValues, [e.target.name]: e.target.value });
  
      console.log(loggValues);
    }

    function onSubmit(e) {
      e.preventDefault();
  
      axios
        .post("http://localhost:1337/api/auth/local", {
          identifier: loggValues.username,
          password: loggValues.password,
        })
        .then((response) => {
          console.log("UserProfile", response.data.user);
          console.log("UserToken", response.data.jwt);
          
          localStorage.setItem("userEmail", response.data.user.email)
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("username", response.data.user.username);
  
          history("/profile");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setError(
            "didnt't match any user, try again."
          );
        });
    }

    function checkPassword() {
      if (loggValues.password.length < 5) {

      }
    }

  return (
    <> 
      <div class="login">
        <h1>Welcome back!</h1>

        <form class="login-form" onSubmit={onSubmit}>
          <label>Username</label>
          <input 
          type="text"
          name="username"
          placeholder="Username"
          value={loggValues.username}
          onChange={onChange}
          />

          <label>Password</label>
          <input
          type="password"
          name="password"
          placeholder="Password"
          value={loggValues.password}
          onChange={onChange}
          />

          <button class="login-btn">Login</button>
          <h3>{error}</h3>
        </form>

        <p class="here">
          Not a member yet? :) Register <Link to="/register">Here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
