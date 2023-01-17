import React from "react";
import Header from "../utilities/Header";
import Navigator from "../utilities/Navigator";
import "../estimates/Estimates.css";
import floating from "../../assets/floating-btn.svg";
import { Link } from "react-router-dom";

const estimateId = "0001";
const name = "Jose Pérez";
const estimateId2 = "0002";
const name2 = "Martin Pérez";

function Invoices() {
  //Flag of dataEmpty?
  // const dataEmpty = items.length;
  // let dataFlag = "no-show";

  // if (dataEmpty === 0) {
  //   dataFlag = "show";
  //   alertData = "No data";
  // }

  return (
    <>
      <Header />
      <div className="main">
        <h1 className="title">Invoices</h1>

        <div className="btn-filters">
          <div className="selector-all">All</div>
          <div className="selector">Outstanding</div>
          <div className="selector">Paid</div>
        </div>
        <div className="total">
          <div className="text-total">Total: </div>
          <div className="quantity-total"> $11,122.00</div>
        </div>
        <p className="month-year">Nov 2022</p>
        <div className="list-estimates">
          <Link className="link" to={`/invoices/${estimateId}`}>
            <div className="cardX mb-3">
              <div className="head-estimate">
                <h6 className="">
                  # INV {estimateId}: {name}
                </h6>
                <h6 className="bold">$32,424.00</h6>
              </div>
              <div className="footer-estimate">
                <h6 className="date">20 Nov 2022</h6>
                <div className="clasifier">open</div>
              </div>
            </div>
          </Link>
          <Link className="link" to={`/invoices/${estimateId}`}>
            <div className="cardX mb-3">
              <div className="head-estimate">
                <h6 className="">
                  # INV {estimateId2}: {name2}
                </h6>
                <h6 className="bold">$32,424.00</h6>
              </div>
              <div className="footer-estimate">
                <h6 className="date">20 Nov 2022</h6>
                <div className="clasifier">open</div>
              </div>
            </div>
          </Link>
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
