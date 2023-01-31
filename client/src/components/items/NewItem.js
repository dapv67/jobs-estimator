import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";
import Swal from "sweetalert2";

function NewItem() {
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  const [descrip, setDescrip] = useState("");
  const [type_work, setType_work] = useState("");
  const [price, setPrice] = useState("");
  const [unit_measurement, setUnit_measurement] = useState("");
  const navigate = useNavigate();

  //Functions
  const add = async (e) => {
    e.preventDefault();
    let data = {
      userAuth: userAuth,
      descrip: descrip,
      type_work: type_work,
      price: price,
      unit_measurement: unit_measurement,
    };
    // console.log(data.type_work);

    fetch("http://127.0.0.1:5005/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Item added!", "success");
        navigate(`/items/u/${userAuth}`);
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
          <Link className="link" to={`/items/u/${userAuth}`}>
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">ITE</h1>
        </div>

        <Form className="mt-4">
          <Form.Text className="text-muted mb-3">
            Note: * They are mandatory.
          </Form.Text>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Item description *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name item"
              value={descrip}
              onChange={(e) => {
                setDescrip(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type of work *</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={type_work}
              onChange={(e) => {
                setType_work(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              <option value="painting">Painting</option>
              <option value="flooring">Flooring</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Price/Unit measurement</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter name item"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Unit measurement</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={unit_measurement}
              onChange={(e) => {
                setUnit_measurement(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              <option value="unit">unit</option>
              <option value="ft">ft</option>
              <option value="ft2">ft2</option>
            </Form.Select>
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

export default NewItem;
