import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../Styles/Register.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log("manfo");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/rest/v1/users/Login?user=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.password === password) {
          console.log("Genian maal hai");
          console.log(data.id );
          navigate("/newsfeed", { state: { id: data.id } }); 
        } else {
          console.log("Ustaad pilag shaat hia");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Username"
            name="Username"
            onChange={handleNameChange}
          />
          <input
            type="text"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={handlePasswordChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <br />
        <p>
          Don't have any account ? <Link to="/">Register</Link>{" "}
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Login;
