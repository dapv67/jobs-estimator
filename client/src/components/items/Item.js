import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";
import Swal from "sweetalert2";

function NewItem() {
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  const { id } = useParams();
  const [descrip, setDescrip] = useState("");
  const [type_work, setType_work] = useState("");
  const [price, setPrice] = useState("");
  const [unit_measurement, setUnit_measurement] = useState("");
  const navigate = useNavigate();

  //Inputs charged
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // set
        setDescrip(data.descrip);
        setType_work(data.type_work);
        setPrice(data.price);
        setUnit_measurement(data.unit_measurement);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Functions

  //update
  const updateItem = async (e) => {
    e.preventDefault();
    let data = {
      id: id,
      price: price,
      unit_measurement: unit_measurement,
    };

    fetch("http://127.0.0.1:5005/api/items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Item updated!", "success");
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

  //delete
  const deleteItem = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to delete the item?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: id,
        };
        fetch("http://127.0.0.1:5005/api/items", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log("Success:", response);
            Swal.fire("Confirmation!", "Item deleted!", "success");
            navigate(`/items/u/${userAuth}`);
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
          <Link className="link" to={`/items/u/${userAuth}`}>
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">ITE {descrip}</h1>
        </div>

        <Form className="mt-4">
          <Form.Text className="text-muted mb-3">
            Note: * They are mandatory.
          </Form.Text>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type of work *</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={type_work}
              disabled
              readOnly
            >
              <option selected="selected" value={type_work}>
                {type_work}
              </option>
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
              <option selected="selected" value={unit_measurement}>
                {unit_measurement}
              </option>
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
              onClick={updateItem}
            >
              Update
            </Button>
          </div>
          <div className="d-flex mb-5">
            <Button
              className="w-100 bold"
              variant="outline-danger"
              size="lg"
              onClick={deleteItem}
            >
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default NewItem;
