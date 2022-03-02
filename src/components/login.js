import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  //Värden för input 
  const initialValues = {
    username: "",
    password: "",
  };

    //hooks för logga in värden, error, och för redirect till annan komponent
    const [loggValues, setLoggValues] = useState(initialValues);
    const [error, setError] = useState("");
    const history = useNavigate();

    //Kontrollerade inputs
    function onChange(e) {
      setLoggValues({ ...loggValues, [e.target.name]: e.target.value });
  
      console.log(loggValues);
    }

    //Postas till api via axios för att kolla att värdena matchar user
    //Skickas till profil-sida vid lyckad inloggning
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
