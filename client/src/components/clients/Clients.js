import React, { useState } from "react";
import Header from "../utilities/Header";
import Navigator from "../utilities/Navigator";
import "../estimates/Estimates.css";
import floating from "../../assets/floating-btn.svg";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

function Clients() {
  const [clients, setClients] = useState([]);

  // Consumo de api (Aqui es donde conectamos el cliente con el server)
  const loadData = () => {
    fetch("http://127.0.0.1:5005/api/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => {
        console.log(error);
      });
  };
  loadData();

  //Flag of dataEmpty?
  const dataEmpty = clients.length;
  let dataFlag = "no-show";
  let alertData = "";

  if (dataEmpty === 0) {
    dataFlag = "show";
    alertData = "No data";
  }
  return (
    <>
      <Header />
      <div className="main">
        <h1 className="title">Clients</h1>

        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Search by email..."
            value=""
          />
        </Form.Group>

        <div className="list-estimates space-bottom-data">
          <h1 className={`text-center ${dataFlag}`}>{alertData}</h1>
          {clients.map((eachOne) => {
            return (
              <Link
                key={eachOne.id}
                className="link"
                to={`/clients/${eachOne._id}`}
              >
                <div className="cardX mb-3">
                  <div className="head-estimate">
                    <h6 className="">Name: {eachOne.name}</h6>
                    <h6 className="bold">$ {eachOne.email}</h6>
                  </div>
                  <div className="footer-estimate">
                    <h6 className="date">{eachOne.phone}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link className="link" to="/clients/new">
          <img className="btn-floating" src={floating} alt="btn-flotante" />
        </Link>
      </div>
      <Navigator />
    </>
  );
}

export default Clients;
