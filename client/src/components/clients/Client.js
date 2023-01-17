import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";

function Client() {
  //Hooks
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const navigate = useNavigate();

  //Inputs charged
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/clients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // set
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress1(data.address1);
        setAddress2(data.address2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Functions
  //update
  const update = async (e) => {
    e.preventDefault();
    let data = {
      id: id,
      phone: phone,
      address1: address1,
      address2: address2,
    };
    // console.log(data);

    fetch("http://127.0.0.1:5005/api/clients", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Client updated!", "success");
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

  //delete
  const deleteClient = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to delete the client?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: id,
        };
        fetch("http://127.0.0.1:5005/api/clients", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log("Success:", response);
            Swal.fire("Confirmation!", "Client deleted!", "success");
            navigate("/clients");
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Error!", error, "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
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
          <h1 className="">CLI {name}</h1>
        </div>
        <div className="btn-filters">
          <Link className="link">
            <div className="selector-rounded">Make estimate</div>
          </Link>
          <div className="selector-rounded">Make invoice</div>
        </div>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              disabled
              readOnly
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
            <Form.Label>Address 1</Form.Label>
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
              onClick={update}
            >
              Update
            </Button>
          </div>
          <div className="d-flex mb-5">
            <Button
              className="w-100 bold"
              variant="outline-danger"
              size="lg"
              onClick={deleteClient}
            >
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Client;
