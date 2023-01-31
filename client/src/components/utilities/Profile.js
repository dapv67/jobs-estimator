import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../utilities/Header";
import back from "../../assets/back.svg";
import Swal from "sweetalert2";

export default function Profile() {
  const [business, setBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [linkPay, setLinkPay] = useState("");
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/users/${userAuth}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(userAuth);
        setUser(data.user);

        setBusiness(data.name_business);
        setPhone(data.phone_business);
        setAddress(data.address_business);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //update
  const update = async (e) => {
    e.preventDefault();
    let data = {
      id: userAuth,
      phone: phone,
      address: address,
      business: business,
    };
    // console.log(data);

    fetch("http://127.0.0.1:5005/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Business profile updated!", "success");
        navigate(`/estimates/u/${userAuth}`);
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
          <Link className="link" to={`/estimates/u/${userAuth}`}>
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">Business Profile</h1>
        </div>

        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>User</Form.Label>
            <Form.Control type="email" value={user} disabled readOnly />
          </Form.Group>

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
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Link Pay (Stripe or Paypal)</Form.Label>
            <Form.Control
              type="text"
              value={linkPay}
              onChange={(e) => {
                setLinkPay(e.target.value);
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
            <Button className="w-100 bold" variant="outline-danger" size="lg">
              Delete account
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
