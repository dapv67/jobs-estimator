import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../utilities/Header";
import { Form, Button } from "react-bootstrap";
import back from "../../assets/back.svg";

import { Link } from "react-router-dom";
import "./NewEstimate.css";
import Swal from "sweetalert2";

function Estimate() {
  //useParams nos permite accerder desde un componente a los parametros de la ruta
  const { id } = useParams(); // Este se debe de llamar como lo llamamos en App.js (identificador dinamizado)
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  //states para hacer cuentas
  const [subtotal, setSubtotal] = useState(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState(0);
  const [totalBeforeTax, setTotalBeforeTax] = useState(0);
  const [calculatedTax, setCalculatedTax] = useState(0);
  const [total, setTotal] = useState(0);

  //states de los inputs
  const [rate, setRate] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [dateEstimate, setDateEstimate] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [addressClient, setAddressClient] = useState("");

  const [job, setJob] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [counter, setCounter] = useState(0);
  const [folio, setFolio] = useState("");
  const [counterInv, setCounterInv] = useState(0);
  const [folioInv, setFolioInv] = useState("");
  const [status, setStatus] = useState("");

  const [items, setItems] = useState([]);
  const [itemsOptions, setItemsOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

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
        setAddressClient(data.address_client);
        setStatus(data.status);
        setItems(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/invoices/counter/${userAuth}`)
      .then((response) => response.json())
      .then((data) => {
        setCounterInv(parseFloat(data) + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [counterInv]);
  useEffect(() => {
    setFolioInv("INV" + counterInv);
  }, [counterInv]);

  //Get the items options
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/items/u/${userAuth}`)
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
      setSubtotal(aux + parseFloat(rate));
    };
    subtotalCalculate();
  }, [items]);
  useEffect(() => {
    console.log("Items: " + JSON.stringify(items, null, 4));
    const subtotalCalculate = () => {
      let aux = 0;
      items.map((i) => {
        aux += i.subtotal;
      });
      console.log("Aux = " + aux);
      setSubtotal(aux + parseFloat(rate));
    };
    subtotalCalculate();
  }, [rate]);

  useEffect(() => {
    console.log("Subtotal = " + subtotal);
  }, [subtotal]);

  //Efectos para calcular el descuento
  useEffect(() => {
    let discountTotal = 0;
    discountTotal = (parseFloat(subtotal) * parseFloat(discount)) / 100;
    console.log("Descuento calculado = " + discountTotal);
    setCalculatedDiscount(discountTotal);
  }, [subtotal]);

  useEffect(() => {
    let discountTotal = 0;
    discountTotal = (parseFloat(subtotal) * parseFloat(discount)) / 100;
    console.log("Descuento calculado = " + discountTotal);
    setCalculatedDiscount(discountTotal);
  }, [discount]);

  //Efecto para calular total antes de impuestos
  useEffect(() => {
    let totalBeforeAux = 0;
    totalBeforeAux = parseFloat(subtotal) - parseFloat(calculatedDiscount);
    console.log("Total antes de impuestos = " + totalBeforeAux);
    setTotalBeforeTax(totalBeforeAux);
  }, [calculatedDiscount]);
  useEffect(() => {
    let totalBeforeAux = 0;
    totalBeforeAux = parseFloat(subtotal) - parseFloat(calculatedDiscount);
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
  }, [totalBeforeTax]);

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

  //Functions
  const makeInvoice = async (e) => {
    e.preventDefault();
    let data = {
      userAuth: userAuth,
      folio: folioInv,
      dateInvoice: dateEstimate,
      dueDate: dateEstimate,
      nameClient: nameClient,
      emailClient: emailClient,
      addressClient: addressClient,
      job: job,
      rate: rate,
      taxes: taxes,
      calculatedTax: calculatedTax,
      discount: discount,
      calculatedDiscount: calculatedDiscount,
      subtotal: subtotal,
      total: total,
      items: items,
    };
    //1 Invoice added
    fetch("http://127.0.0.1:5005/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Invoice added!", "success");
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

    let data2 = {
      id: id,
      dateEstimate: dateEstimate,
      status: "closed",
      job: job,
      rate: rate,
      taxes: taxes,
      calculatedTax: calculatedTax,
      discount: discount,
      calculatedDiscount: calculatedDiscount,
      subtotal: subtotal,
      total: total,
      items: items,
    };
    // console.log(data);

    fetch("http://127.0.0.1:5005/api/estimates", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Estimate now is an Invoice!", "success");
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

  const updateEstimate = async (e) => {
    e.preventDefault();
    let data = {
      id: id,
      dateEstimate: dateEstimate,
      status: status,
      job: job,
      rate: rate,
      taxes: taxes,
      calculatedTax: calculatedTax,
      discount: discount,
      calculatedDiscount: calculatedDiscount,
      subtotal: subtotal,
      total: total,
      items: items,
    };
    // console.log(data);

    fetch("http://127.0.0.1:5005/api/estimates", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
        Swal.fire("Confirmation!", "Estimate updated!", "success");
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

  //delete
  const deleteEstimate = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to delete the estimate?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: id,
        };
        fetch("http://127.0.0.1:5005/api/estimates", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log("Success:", response);
            Swal.fire("Confirmation!", "Estimate deleted!", "success");
            navigate(`/estimates/u/${userAuth}`);
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

  //Send email
  const sendEmail = (e) => {
    window.location.href = `mailto:${emailClient}?Subject=Estimate #${folio}: ${job}`;
    navigate(`/estimates/u/${userAuth}`);
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <div className="main">
        <div className="d-flex">
          <Link className="link" to={`/estimates/u/${userAuth}`}>
            <img src={back} alt="back-icon" className="me-5" />
          </Link>
          <h1 className="">{folio}</h1>
        </div>
        <div className="btn-filters">
          <Link
            className="link"
            to={`/estimates/${id}/pdf`}
            state={{ type: "Estimate" }}
          >
            <div className="selector-rounded">Preview</div>
          </Link>
          <Link
            className="link"
            to={`/estimates/${id}/pdf`}
            state={{ type: "Estimate", prices: 0 }}
          >
            <div className="selector-rounded">Preview without prices</div>
          </Link>
          <div className="selector-rounded" onClick={makeInvoice}>
            Make invoice
          </div>
        </div>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Number</Form.Label>
            <Form.Control type="text" value={folio} disabled readOnly />
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
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={status}
              selec
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option selected="selected" value={status}>
                {status}
              </option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </Form.Select>
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
          <div className="mb-5"></div>

          <div className="d-flex mb-3">
            <Link className="w-100" to="#" onClick={sendEmail}>
              <Button
                className="w-100 bold"
                variant="primary"
                size="lg"
                type="submit"
                // onClick={handleSubmit}
              >
                Send by email
              </Button>
            </Link>
          </div>
          <div className="d-flex mb-3">
            <Button
              className="w-100 bold"
              variant="outline-primary"
              size="lg"
              onClick={updateEstimate}
            >
              Update
            </Button>
          </div>
          <div className="d-flex mb-5">
            <Button
              className="w-100 bold"
              variant="outline-danger"
              size="lg"
              onClick={deleteEstimate}
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
