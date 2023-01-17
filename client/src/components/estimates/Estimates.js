import React, { useState } from "react";
import Header from "../utilities/Header";
import Navigator from "../utilities/Navigator";
import "./Estimates.css";
import floating from "../../assets/floating-btn.svg";
import { Link } from "react-router-dom";

function Estimates() {
  const [estimates, setEstimates] = useState([]);

  // Consumo de api (Aqui es donde conectamos el cliente con el server)
  const loadEstimates = () => {
    fetch("http://127.0.0.1:5005/api/estimates")
      .then((response) => response.json())
      .then((data) => setEstimates(data))
      .catch((error) => {
        console.log(error);
      });
  };
  loadEstimates();

  //Flag of dataEmpty?
  const dataEmpty = estimates.length;
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
        <h1 className="title">Estimates</h1>

        <div className="btn-filters">
          <div className="selector-all">All</div>
          <div className="selector">Open</div>
          <div className="selector">Closed</div>
        </div>
        <div className="total">
          <div className="text-total">Total: </div>
          <div className="quantity-total"> $11,122.00</div>
        </div>
        <p className="month-year">Nov 2022</p>
        <div className="list-estimates space-bottom-data">
          <h1 className={`text-center ${dataFlag}`}>{alertData}</h1>
          {estimates.map((eachOne) => {
            return (
              <Link
                key={eachOne.id}
                className="link"
                to={`/estimates/${eachOne._id}`}
              >
                <div className="cardX mb-3">
                  <div className="head-estimate">
                    <h6 className="">
                      # {eachOne.folio}: {eachOne.name_client}
                    </h6>
                    <h6 className="bold">$ {eachOne.base_rate}</h6>
                  </div>
                  <div className="footer-estimate">
                    <h6 className="date">{eachOne.date}</h6>
                    <div className="clasifier">{eachOne.status}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link className="link" to="/estimates/new">
          <img className="btn-floating" src={floating} alt="btn-flotante" />
        </Link>
      </div>
      <Navigator />
    </>
  );
}

export default Estimates;
