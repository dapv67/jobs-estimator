import React from "react";
import { useParams } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "../estimates/NewEstimate.css";

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );
// Other option
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function Invoice() {
  const { id } = useParams();
  // const { name } = useParams();

  const msg = {
    // js74@mHq!Qt7Bfc. password personal
    to: "alvarodperezv@gmail.com",
    from: "alvarodperezv.developer@gmail.com", // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("You clicked submit.");
  //   //ES6
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       // form.resetFields();
  //       console.log("Email Sent!");
  //       // notification.open({
  //       //   message: "Message successfu!",
  //       //   description: "We have successfully received your email.",
  //       // });
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //     });
  //   //ES8
  //   // (async () => {
  //   //   try {
  //   //     await sgMail.send(msg);
  //   //   } catch (error) {
  //   //     console.error(error);

  //   //     if (error.response) {
  //   //       console.error(error.response.body);
  //   //     }
  //   //   }
  //   // })();
  // }

  return (
    <>
      <Header />
      <div className="main">
        <div className="d-flex">
          <Link className="link" to="/invoices">
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">INV {id}</h1>
        </div>
        <div className="btn-filters">
          <Link className="link" to={`/invoices/${id}/pdf`}>
            <div className="selector-rounded">Preview</div>
          </Link>
          <div className="selector-rounded">Mark paid</div>
        </div>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Invoice date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>To</Form.Label>
            <Form.Control type="text" placeholder="" value="Jose Pérez" />
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
          <Form.Group className="mb-5" controlId="">
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
          <Form.Group className="mb-5" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Hide unit prices for customer" />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3 mb-5">
            <h3>Total:</h3>
            <h3>$2,343.00</h3>
          </div>
          <div className="d-flex mb-3">
            <Button
              className="w-100 bold"
              variant="primary"
              size="lg"
              type="submit"
              // onClick={handleSubmit}
            >
              Send by email
            </Button>
          </div>
          <div className="d-flex mb-3">
            <Button className="w-100 bold" variant="outline-primary" size="lg">
              Save
            </Button>
          </div>
          <div className="d-flex mb-5">
            <Button
              className="w-100 bold"
              variant="outline-danger"
              size="lg"
              type="submit"
            >
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Invoice;
