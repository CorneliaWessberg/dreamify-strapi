import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [regValues, setRegValues] = useState(initialValues);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    setRegValues({ ...regValues, [e.target.name]: e.target.value });

    console.log(regValues);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (regValues.password.length < 5) {
      alert("password must be 6 characters at least");
    }

    axios
      .post("http://localhost:1337/api/auth/local/register", {
        username: regValues.username,
        email: regValues.email,
        password: regValues.password,
      })
      .then((response) => {
        console.log("userProfile", response.data.user);
        if (response.data.user) setSuccess(true);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
      })
      .catch((err) => {
        setError("Something went wrong, try again");
      });
  }

  return (
    <>
      {success ? (
        <div class="success">
          <h1>Your registration was succesfully done!</h1>
          <p class="here">
            Go to login <Link to="/login">Here</Link>
          </p>
        </div>
      ) : (
        <>
          <div class="register">
            <h1>Welcome to the dream-team :)</h1>
            <form onSubmit={onSubmit} class="register-form">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={regValues.username}
                onChange={onChange}
                name="username"
              />
              <label>E-mail</label>
              <input
                type="email"
                placeholder="E-mail"
                value={regValues.email}
                onChange={onChange}
                name="email"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={regValues.password}
                onChange={onChange}
                name="password"
              />
              <button class="submit-btn">Submit</button>
              <h3>{error}</h3>
            </form>
          </div>
          <div class="toLogin">
            Back to login <Link to="/login">Here</Link>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
