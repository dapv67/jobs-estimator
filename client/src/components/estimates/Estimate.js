import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "./NewEstimate.css";

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );
// Other option
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function Estimate() {
  //useParams nos permite accerder desde un componente a los parametros de la ruta
  const { id } = useParams(); // Este se debe de llamar como lo llamamos en App.js (identificador dinamizado)

  //states para hacer cuentas
  const [subtotal, setSubtotal] = useState(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState(0);
  const [totalBeforeTax, setTotalBeforeTax] = useState(0);
  const [calculatedTax, setCalculatedTax] = useState(0);

  //states de los inputs
  const [rate, setRate] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const [dateEstimate, setDateEstimate] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [emailClient, setEmailClient] = useState("");

  const [job, setJob] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [counter, setCounter] = useState(0);
  const [folio, setFolio] = useState("");
  const [status, setStatus] = useState("");

  const [items, setItems] = useState([]);
  const [itemsOptions, setItemsOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  // Consumo de api
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/estimates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDateEstimate(data.date);
        setJob(data.job_descrip);
        setFolio(data.folio);
        setDiscount(data.discount);
        setRate(data.base_rate);
        setTaxes(data.taxes);
        setNameClient(data.name_client);
        setEmailClient(data.email_client);
        setStatus(data.status);
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get the items options
  useEffect(() => {
    fetch("http://127.0.0.1:5005/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItemsOptions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Efectos para calcular el subtotal general
  useEffect(() => {
    console.log("Items: " + JSON.stringify(items, null, 4));
    const subtotalCalculate = () => {
      let aux = 0;
      items.map((i) => {
        aux += i.subtotal;
      });
      console.log("Aux = " + aux);
      setSubtotal(aux);
    };
    subtotalCalculate();
  }, [items]);
  useEffect(() => {
    console.log("Subtotal = " + subtotal);
  }, [subtotal]);

  //Efectos para calcular el descuento
  useEffect(() => {
    let discountTotal = 0;
    discountTotal =
      ((parseFloat(subtotal) + parseFloat(rate)) * parseFloat(discount)) / 100;
    console.log("Discount after calculate = " + discountTotal);
    setCalculatedDiscount(discountTotal);
  }, [subtotal]);
  useEffect(() => {
    let discountTotal = 0;
    discountTotal =
      ((parseFloat(subtotal) + parseFloat(rate)) * parseFloat(discount)) / 100;
    console.log("Discount after calculate = " + discountTotal);
    setCalculatedDiscount(discountTotal);
  }, [discount]);
  useEffect(() => {
    let discountTotal = 0;
    discountTotal =
      ((parseFloat(subtotal) + parseFloat(rate)) * parseFloat(discount)) / 100;
    console.log("Discount after calculate = " + discountTotal);
    setCalculatedDiscount(discountTotal);
  }, [rate]);

  //Efecto para calular total antes de impuestos
  useEffect(() => {
    let totalBeforeAux = 0;
    totalBeforeAux =
      parseFloat(subtotal) + parseFloat(rate) - parseFloat(calculatedDiscount);
    console.log("Total antes de impuestos = " + totalBeforeAux);
    setTotalBeforeTax(totalBeforeAux);
  }, [calculatedDiscount]);
  useEffect(() => {
    let totalBeforeAux = 0;
    totalBeforeAux =
      parseFloat(subtotal) + parseFloat(rate) - parseFloat(calculatedDiscount);
    console.log("Total antes de impuestos = " + totalBeforeAux);
    setTotalBeforeTax(totalBeforeAux);
  }, [rate]);
  useEffect(() => {
    let totalBeforeAux = 0;
    totalBeforeAux =
      parseFloat(subtotal) + parseFloat(rate) - parseFloat(calculatedDiscount);
    console.log("Total antes de impuestos = " + totalBeforeAux);
    setTotalBeforeTax(totalBeforeAux);
  }, [subtotal]);

  //Efecto para calcular el impuesto
  useEffect(() => {
    let calculatedTaxAux = 0;
    calculatedTaxAux = (parseFloat(totalBeforeTax) * parseFloat(taxes)) / 100;
    console.log("Impuesto calculado = " + calculatedTaxAux);
    setCalculatedTax(calculatedTaxAux);
  }, [taxes]);
  useEffect(() => {
    let calculatedTaxAux = 0;
    calculatedTaxAux = (parseFloat(totalBeforeTax) * parseFloat(taxes)) / 100;
    console.log("Impuesto calculado = " + calculatedTaxAux);
    setCalculatedTax(calculatedTaxAux);
  }, [subtotal]);

  //Efecto para calcular el total
  useEffect(() => {
    let totalAux = 0;
    totalAux = parseFloat(totalBeforeTax) + parseFloat(calculatedTax);
    console.log("Total = " + totalAux);
    setTotal(totalAux);
  }, [calculatedTax]);
  useEffect(() => {
    let totalAux = 0;
    totalAux = parseFloat(totalBeforeTax) + parseFloat(calculatedTax);
    console.log("Total = " + totalAux);
    setTotal(totalAux);
  }, [totalBeforeTax]);

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

  const handleRemoveItem = (_id) => {
    const newItems = items.filter((item) => item._id !== _id);
    console.log(_id);
    console.log(newItems);
    setItems(newItems);
  };

  const anadir = (newUser) => {
    setItems([...items, newUser]);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://127.0.0.1:5005/api/items/${selectedItem}`
    );
    const data = await response.json();
    const newUser = {
      _id: data._id,
      descrip: data.descrip,
      price: data.price,
      type_work: data.type_work,
      unit_measurement: data.unit_measurement,
      quantity: quantity,
      subtotal: data.price * quantity,
    };

    //Add
    anadir(newUser);
    setSelectedItem("Open this select menu");
    setQuantity(1);
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="d-flex">
          <Link className="link" to="/">
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">{folio}</h1>
        </div>
        <div className="btn-filters">
          <Link className="link" to={`/estimates/${id}/pdf`}>
            <div className="selector-rounded">Preview</div>
          </Link>
          <div className="selector-rounded">Make invoice</div>
        </div>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Number</Form.Label>
            <Form.Control type="text" value={folio} disabled readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" value={status} readOnly disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>To</Form.Label>

            <Form.Control
              type="text"
              value={`${nameClient}, ${emailClient}`}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Estimate date</Form.Label>
            <Form.Control
              type="date"
              value={dateEstimate}
              onChange={(e) => {
                setDateEstimate(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Job description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
            />
          </Form.Group>

          <h3>Items</h3>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Item</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={selectedItem}
              onChange={(e) => {
                setSelectedItem(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              {itemsOptions.map((eachOne) => (
                <option key={eachOne._id} value={eachOne._id}>
                  {eachOne.descrip} ${eachOne.price}/{eachOne.unit_measurement}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Qty.</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter qty del item"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </Form.Group>
          <div className="mb-3">
            <a href="" className="cursor" onClick={handleAddItem}>
              Add item
            </a>
          </div>

          {items.map((indice) => (
            <div className="cardY mb-5" key={indice._id}>
              <div className="content-item">
                <div className="d-flex justify-content-between">
                  <h6>
                    {indice.descrip} ${indice.price}/{indice.unit_measurement}
                  </h6>
                  <h5>${indice.subtotal}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="ms-2">Qty: {indice.quantity}</p>
                </div>
                <hr />
                <div>
                  <a
                    href=""
                    className="cursor"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(indice._id);
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </div>
            </div>
          ))}

          <hr />
          <Form.Group className="mb-3 mt-5" controlId="">
            <Form.Label>Base rate $ (optional)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter a rate"
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Discount % (optional)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter a rate"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Taxes % (optional)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter taxes"
              value={taxes}
              onChange={(e) => {
                setTaxes(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-between mt-3 mb-3">
            <h3>Total:</h3>
            <h3>{total}</h3>
          </div>
          <Form.Group className="mb-5" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Hide unit prices for customer" />
          </Form.Group>

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

export default Estimate;
