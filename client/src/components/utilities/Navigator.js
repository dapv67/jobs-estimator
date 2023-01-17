import React from "react";

import invoice from "../../assets/invoice.svg";
import item from "../../assets/item.svg";
import client from "../../assets/client.svg";
import calculate from "../../assets/calculate.svg";
import { Link, NavLink } from "react-router-dom";
import "./Navigator.css";

function Navigator() {
  return (
    <div className="navigator-container">
      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to="/"
      >
        <img src={calculate} alt="icon" />
        <div className="title-icon">Estimates</div>
      </NavLink>

      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to="/invoices"
      >
        <img src={invoice} alt="icon" />
        <div className="title-icon">Invoices</div>
      </NavLink>
      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to="/clients"
      >
        <img src={client} alt="icon" />
        <div className="title-icon">Clients</div>
      </NavLink>

      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to="/items"
      >
        <img src={item} alt="icon" />
        <div className="title-icon">Items</div>
      </NavLink>
    </div>
  );
}

export default Navigator;
