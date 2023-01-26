import React from "react";

import invoice from "../../assets/invoice.svg";
import item from "../../assets/item.svg";
import client from "../../assets/client.svg";
import calculate from "../../assets/calculate.svg";
import { Link, NavLink, useParams } from "react-router-dom";

import "./Navigator.css";

function Navigator() {
  const { id } = useParams();

  return (
    <div className="navigator-container">
      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to={`/estimates/u/${id}`}
      >
        <img src={calculate} alt="icon" />
        <div className="title-icon">Estimates</div>
      </NavLink>

      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to={`/invoices/u/${id}`}
      >
        <img src={invoice} alt="icon" />
        <div className="title-icon">Invoices</div>
      </NavLink>
      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to={`/clients/u/${id}`}
      >
        <img src={client} alt="icon" />
        <div className="title-icon">Clients</div>
      </NavLink>

      <NavLink
        className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
        to={`/items/u/${id}`}
      >
        <img src={item} alt="icon" />
        <div className="title-icon">Items</div>
      </NavLink>
    </div>
  );
}

export default Navigator;
