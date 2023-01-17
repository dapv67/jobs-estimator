import React from "react";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";

function NewInvoice() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="d-flex">
          <Link className="link" to="/invoices">
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">New Invoice</h1>
        </div>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Invoice date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>To</Form.Label>
            <Form.Control type="email" placeholder="Enter client" />
            <Form.Text className="text-muted">
              Note: We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Job description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Base rate $ (optional)</Form.Label>
            <Form.Control type="number" placeholder="Enter a rate" />
          </Form.Group>

          <h3>Items</h3>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Item</Form.Label>
            <Form.Control type="text" placeholder="Enter item" />
          </Form.Group>
          <h5 className="text-primary me-3 mb-3">Add item</h5>
          <div className="cardX mb-5">
            <div className="content-item">
              <div className="d-flex justify-content-between">
                <h6>Painting room</h6>
                <h6>$1,200.00</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="text-secondary">1 X $100</h6>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3 mb-3">
            <h3>Total:</h3>
            <h3>$2,343.00</h3>
          </div>
          <Link to="/invoices">
            <div className="d-flex">
              <Button
                className="w-100"
                variant="primary"
                size="lg"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default NewInvoice;
