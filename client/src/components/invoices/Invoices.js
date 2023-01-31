import React, { useState, useEffect } from "react";
import Header from "../utilities/Header";
import Navigator from "../utilities/Navigator";
import "../estimates/Estimates.css";
import floating from "../../assets/floating-btn.svg";
import { Link } from "react-router-dom";

function Invoices() {
  const [total, setTotal] = useState(0);

  const [invoices, setInvoices] = useState([]);
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  //Consumo de api
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/invoices/u/${userAuth}`)
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    let auxTotal = 0;
    invoices.map((i) => {
      auxTotal += i.total;
    });
    setTotal(auxTotal);
    console.log(auxTotal);
  }, [invoices]);

  const filterAll = () => {
    fetch(`http://127.0.0.1:5005/api/invoices/u/${userAuth}`)
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) => {
        console.log(error);
      });
    setTotal(0);
  };
  const filterCategory = (category) => {
    fetch(`http://127.0.0.1:5005/api/invoices/cat/${userAuth}/${category}`)
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) => {
        console.log(error);
      });
    setTotal(0);
  };

  // Flag of dataEmpty?
  const dataEmpty = invoices.length;
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
        <h1 className="title">Invoices</h1>

        <div className="btn-filters">
          <button className="selector" onClick={filterAll}>
            All
          </button>
          <button
            className="selector"
            onClick={() => {
              filterCategory("outstanding");
            }}
          >
            Outstanding
          </button>
          <button
            className="selector"
            onClick={() => {
              filterCategory("paid");
            }}
          >
            Paid
          </button>
        </div>
        <div className="total">
          <div className="text-total">Total: </div>
          <div className="quantity-total"> ${total}</div>
        </div>
        <p className="month-year">Nov 2022</p>
        <div className="list-estimates space-bottom-data">
          <h1 className={`text-center ${dataFlag}`}>{alertData}</h1>
          {invoices.map((eachOne) => {
            return (
              <Link
                key={eachOne._id}
                className="link"
                to={`/invoices/${eachOne._id}`}
              >
                <div className="cardX mb-3">
                  <div className="head-estimate">
                    <h6 className="">
                      # {eachOne.folio}: {eachOne.name_client}
                    </h6>
                    <h6 className="bold">$ {eachOne.total}</h6>
                  </div>
                  <div className="footer-estimate">
                    <h6 className="date">{eachOne.job_descrip}</h6>
                    <div className="clasifier">{eachOne.status}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link className="link" to="/invoices/new">
          <img className="btn-floating" src={floating} alt="btn-flotante" />
        </Link>
      </div>
      <Navigator />
    </>
  );
}

export default Invoices;
