import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";
import Swal from "sweetalert2";

function NewClient() {
  //Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const navigate = useNavigate();

  //Functions
  const add = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      phone: phone,
      address1: address1,
      address2: address2,
    };
    console.log(data);

    fetch("http://127.0.0.1:5005/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Client added!", "success");
        navigate("/clients");
      } else {
        console.error("Error:", response);
        Swal.fire(
          "Error 500!",
          "Ups! Something happened on the server",
          "error"
        );
      }
    });
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="d-flex">
          <Link className="link" to="/clients">
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">CLI </h1>
        </div>

        <Form className="mt-4">
          <Form.Text className="text-muted mb-3">
            Note: * They are mandatory.
          </Form.Text>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Client name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter client"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter code client"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Address 1 *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address 1 client"
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Address 2 </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address 2 client"
              value={address2}
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-flex mb-3">
            <Button
              className="w-100 bold"
              variant="primary"
              size="lg"
              onClick={add}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default NewClient;
