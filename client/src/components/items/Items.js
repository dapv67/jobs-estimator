import React, { useState, useEffect } from "react";
import Header from "../utilities/Header";
import Navigator from "../utilities/Navigator";
import "../estimates/Estimates.css";
import floating from "../../assets/floating-btn.svg";
import { Link } from "react-router-dom";

function Items() {
  //states
  const [items, setItems] = useState([]);
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));

  //Consumo de api
  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/items/u/${userAuth}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filterAll = () => {
    fetch(`http://127.0.0.1:5005/api/items/u/${userAuth}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.log(error);
      });
  };
  const filterCategory = (category) => {
    fetch(`http://127.0.0.1:5005/api/items/cat/${userAuth}/${category}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.log(error);
      });
  };

  //Flag of dataEmpty?
  const dataEmpty = items.length;
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
        <h1 className="title">Items</h1>
        <div className="btn-filters">
          <button className="selector" onClick={filterAll}>
            All
          </button>
          <button
            className="selector"
            onClick={() => {
              filterCategory("painting");
            }}
          >
            Painting
          </button>
          <button
            className="selector"
            onClick={() => {
              filterCategory("roofing");
            }}
          >
            Roofing
          </button>
          <button className="selector">Etc...</button>
        </div>

        <p className="month-year">All</p>
        <div className="list-estimates space-bottom-data">
          <h1 className={`text-center ${dataFlag}`}>{alertData}</h1>
          {items.map((eachOne) => {
            return (
              <Link
                key={eachOne._id}
                className="link"
                to={`/items/${eachOne._id}`}
              >
                <div className="cardX mb-3">
                  <div className="head-estimate">
                    <h6 className="">{eachOne.descrip}</h6>
                    <h6 className="bold">
                      ${eachOne.price}/{eachOne.unit_measurement}
                    </h6>
                  </div>
                  <div className="footer-estimate">
                    <div className="clasifier">{eachOne.type_work}</div>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* {`${if(items.length === 0)} <h1>No data</h1> `} */}
        </div>

        <Link className="link" to="/items/new">
          <img className="btn-floating" src={floating} alt="btn-flotante" />
        </Link>
      </div>
      <Navigator />
    </>
  );
}

export default Items;
