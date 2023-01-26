import React, { useState, useContext } from "react";
import { AppContext } from "../../app/Provider";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-img.svg";
import "./LoginForm.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [token, setToken] = useContext(AppContext); //Global state

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    let dataset = {
      user: user,
      password: password,
    };

    const response = await fetch("http://127.0.0.1:5005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataset),
    });
    // console.log(response);
    if (response.status === 200) {
      console.log("Success:", response);
      Swal.fire("Confirmation!", "User logged in!", "success");
      const data = await response.json();
      setToken(data); //OnlyTest
      document.cookie = `token=${data.token};max-age=${
        60 * 10
      };path=/;samasite=strict`;
      console.log(document.cookie);
      localStorage.setItem("isAuth", document.cookie); //Token auth
      localStorage.setItem("ui", data.user._id); //User id
      localStorage.setItem("userLogged", data.user.user); //Email del user auth
      let userAuth = localStorage.getItem("ui");
      setTimeout(function () {
        navigate(`/estimates/u/${userAuth}`);
      }, 500);
    } else {
      console.error("Error:", response);
      Swal.fire("Error 400!", "Ups! Wrong credentials", "error");
    }
  };

  return (
    <div className="background">
      <div className="container-form">
        <div className="header-container">
          <div>
            <div className="logo-container">
              <img src={Logo} alt="brand-log" />
            </div>
            <h1>Login</h1>
          </div>
        </div>

        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="email"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-flex mb-3">
            <Link className="w-100" to="/estimates">
              <Button
                className="w-100 bold"
                variant="primary"
                size="lg"
                onClick={login}
              >
                Login
              </Button>
            </Link>
          </div>
          <hr />
          <p>
            New to Bego?
            <Link className="w-100" to="/signup">
              Create an account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
export default LoginForm;
