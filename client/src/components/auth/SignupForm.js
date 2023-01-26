import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo-img.svg";
import "./SignupForm.css";
import Swal from "sweetalert2";

function SignupForm() {
  const navigate = useNavigate();

  const [business, setBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    let data = {
      user: user,
      password: password,
      phone: phone,
      address: address,
      business: business,
    };
    let response = await fetch("http://127.0.0.1:5005/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      console.log("Success:", response);
      Swal.fire("Confirmation!", "User added!", "success");
      navigate("/");
    } else {
      console.error("Error:", response);
      Swal.fire("Error 500!", "Ups! Something happened on the server", "error");
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
            <h1>Signup</h1>
          </div>
        </div>

        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Name business</Form.Label>
            <Form.Control
              type="text"
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Address business</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Phone business</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Group>
          <hr />
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
                // type="submit"
                onClick={signup}
              >
                Signup
              </Button>
            </Link>
          </div>
          <hr />
          <p>
            Already have an account?
            <Link className="w-100" to="/">
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
export default SignupForm;
